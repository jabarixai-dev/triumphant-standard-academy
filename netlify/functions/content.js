import { getStore } from "@netlify/blobs";

const store = getStore("tsa-content");

export default async (request) => {
  try {
    const url = new URL(request.url);
    const section = url.searchParams.get("section");

    if (request.method === "GET") {
      if (section) {
        const data = await store.get(section, { type: "json" });

        return new Response(
          JSON.stringify(data || {}),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache"
            }
          }
        );
      }

      const [news, gallery, fees] = await Promise.all([
        store.get("news", { type: "json" }),
        store.get("gallery", { type: "json" }),
        store.get("fees", { type: "json" })
      ]);

      return new Response(
        JSON.stringify({
          news: news || {},
          gallery: gallery || {},
          fees: fees || {}
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          }
        }
      );
    }

    if (request.method === "POST") {
      const body = await request.json();

      if (!body.section || body.data === undefined) {
        return new Response(
          JSON.stringify({
            error: "section and data are required"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      const allowedSections = ["news", "gallery", "fees"];

      if (!allowedSections.includes(body.section)) {
        return new Response(
          JSON.stringify({
            error: "Invalid section"
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      await store.setJSON(body.section, body.data);

      return new Response(
        JSON.stringify({
          success: true,
          section: body.section
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Method not allowed"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Internal server error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
