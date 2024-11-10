import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

interface Props {
  role: "interviewer" | "interviewee";
  roomId: string;
}

interface RemoteVideo {
  userId: string;
  stream: MediaStream;
  role: "interviewer" | "interviewee";
}

const VideoConference = ({ role, roomId }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peers, setPeers] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [remoteVideos, setRemoteVideos] = useState<RemoteVideo[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Connecting...");
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const userId = useRef(`user-${Math.random().toString(36).substr(2, 9)}`);

  const initializePeerConnection = (remoteSocketId: string) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        if (localStreamRef.current) {
          peerConnection.addTrack(track, localStreamRef.current);
        }
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: remoteSocketId,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      console.log("Received remote track:", event.streams[0]);
      const remoteUserId = remoteSocketId;

      setRemoteVideos((prevVideos) => {
        const filteredVideos = prevVideos.filter(
          (v) => v.userId !== remoteUserId,
        );
        return [
          ...filteredVideos,
          {
            userId: remoteUserId,
            stream: event.streams[0],
            role: role === "interviewer" ? "interviewee" : "interviewer",
          },
        ];
      });
    };

    return peerConnection;
  };

  useEffect(() => {
    const newSocket = io("http://localhost:6969/api/v1/video/connect", {
      path: "/api/v1/video/connect",
    });

    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        newSocket.emit("join-room", { roomId, userId: userId.current, role });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        setConnectionStatus("Failed to access camera/microphone");
      });

    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      newSocket.close();
      peers.forEach((peer) => peer.close());
    };
  }, [roomId, role, peers]);

  useEffect(() => {
    if (!socket) return;

    socket.on("room-full", ({ message }) => {
      setConnectionStatus(message);
    });

    socket.on("role-taken", ({ message }) => {
      setConnectionStatus(message);
    });

    socket.on("room-ready", ({ users }) => {
      setIsRoomReady(true);
      setConnectionStatus("Connected - Room is ready");
    });

    socket.on(
      "user-joined",
      async ({
        userId: remoteUserId,
        socketId: remoteSocketId,
        role: remoteRole,
      }) => {
        console.log("User joined:", remoteUserId, remoteSocketId);

        const peerConnection = initializePeerConnection(remoteSocketId);
        setPeers(
          (prevPeers) => new Map(prevPeers.set(remoteSocketId, peerConnection)),
        );

        try {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socket.emit("offer", { offer, to: remoteSocketId });
        } catch (error) {
          console.error("Error creating offer:", error);
        }
      },
    );

    socket.on("offer", async ({ offer, from }) => {
      const peerConnection = initializePeerConnection(from);
      setPeers((prevPeers) => new Map(prevPeers.set(from, peerConnection)));

      try {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer),
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", { answer, to: from });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("answer", async ({ answer, from }) => {
      const peerConnection = peers.get(from);
      if (peerConnection) {
        try {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer),
          );
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      }
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      const peerConnection = peers.get(from);
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    });

    socket.on("user-left", ({ socketId, role: leftRole }) => {
      const peer = peers.get(socketId);
      if (peer) {
        peer.close();
        peers.delete(socketId);
        setPeers(new Map(peers));
        setRemoteVideos((prevVideos) =>
          prevVideos.filter((v) => v.userId !== socketId),
        );
        setConnectionStatus("Waiting for other participant...");
        setIsRoomReady(false);
      }
    });

    socket.on("new-message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("room-full");
      socket.off("role-taken");
      socket.off("room-ready");
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-left");
      socket.off("new-message");
    };
  }, [socket, peers, initializePeerConnection]);

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const handleSendMessage = () => {
    if (!socket || !messageInput.trim()) return;

    socket.emit("send-message", {
      roomId,
      message: messageInput,
      userId: userId.current,
      role,
    });

    setMessageInput("");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        {/* Connection Status */}
        <div
          className={`mb-4 p-2 rounded ${
            isRoomReady
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {connectionStatus}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Local Video */}
          <div className="relative">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-64 bg-gray-800 rounded-lg object-cover"
            />
            <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 rounded">
              You ({role})
            </span>
            <div className="absolute bottom-2 right-2 space-x-2">
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full ${isMuted ? "bg-red-500" : "bg-white"} hover:bg-opacity-90`}
              >
                {isMuted ? "🔇" : "🎤"}
              </button>
              <button
                onClick={toggleVideo}
                className={`p-2 rounded-full ${isVideoOff ? "bg-red-500" : "bg-white"} hover:bg-opacity-90`}
              >
                {isVideoOff ? "🚫" : "📹"}
              </button>
            </div>
          </div>

          {/* Remote Videos */}
          {remoteVideos.map((remote) => (
            <div key={remote.userId} className="relative">
              <video
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-800 rounded-lg object-cover"
                ref={(el) => {
                  if (el) {
                    el.srcObject = remote.stream;
                  }
                }}
              />
              <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 rounded">
                {remote.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-80 border-l border-gray-200 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.userId === userId.current
                  ? "bg-blue-500 text-white ml-8"
                  : "bg-gray-100 mr-8"
              }`}
            >
              <div className="text-sm">{msg.message}</div>
              <div className="text-xs opacity-75">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
