import { createClient } from "@liveblocks/client";

export const liveblocksClient = createClient({
  publicApiKey: import.meta.env.LIVEBLOCKS_API_KEY, 
});
