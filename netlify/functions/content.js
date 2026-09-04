import { getStore } from "@netlify/blobs";

export default async (request) => {
  const store = getStore("tsa-content");

  if (request.method === "GET") {
    const content = await store.get("content", { type: "json" });

    return new Response(
      JSON.stringify(content || {}),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      }
    );
  }

  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
