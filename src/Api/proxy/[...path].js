// api/proxy/[...path].js
export const config = { runtime: "edge" };

const TARGET = "https://dev1hunter.pythonanywhere.com";
const ALLOWED = [
  "https://streamix-sand.vercel.app", // ضع دومينك هنا
];

export default async function handler(req) {
  const origin = req.headers.get("origin") || "";
  if (!ALLOWED.includes(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }

  // Preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  try {
    // بناء المسار + الكويري
    const url = new URL(req.url);
    const parts = url.pathname.replace(/^\/api\/proxy/, "");
    const targetUrl = TARGET + parts + (url.search || "");

    // مرّر الهيدرز اللازمة فقط
    const forwardHeaders = new Headers(req.headers);
    forwardHeaders.delete("host");
    forwardHeaders.delete("content-length");

    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
      redirect: "manual",
    });

    // أبني الرد وأضيف CORS المناسب
    const resHeaders = new Headers(upstream.headers);
    resHeaders.set("Access-Control-Allow-Origin", origin);
    resHeaders.set("Access-Control-Allow-Credentials", "true");
    resHeaders.delete("transfer-encoding");
    resHeaders.delete("connection");
    resHeaders.delete("content-encoding"); // حتى ما يصير تعارض بالضغط

    return new Response(upstream.body, {
      status: upstream.status,
      headers: resHeaders,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Proxy error", detail: String(e) }),
      {
        status: 502,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      }
    );
  }
}
