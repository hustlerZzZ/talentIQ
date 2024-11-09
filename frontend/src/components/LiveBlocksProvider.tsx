
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import CodeEditor from "./CodeEditor";

export default function LiveBlocksController() {
  return (
    <LiveblocksProvider publicApiKey={import.meta.env.LIVEBLOCKS_API_KEY}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <CodeEditor />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
