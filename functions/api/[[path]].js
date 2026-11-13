/**
 * Cloudflare Pages Function: /api/*
 * Reverse-proxies API calls from Cloudflare Pages (omnitool.worldsneed.com)
 * to the Vercel Serverless API backend.
 */
export async function onRequest(context) {
  const { request, env } = context;
  const incomingUrl = new URL(request.url);
  const backendOrigin = (env && env.VERCEL_API_ORIGIN) || "https://omnitool-hub.vercel.app";
  const targetUrl = `${backendOrigin.replace(/\/$/, "")}${incomingUrl.pathname}${incomingUrl.search}`;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init = {
    method: request.method,
    headers,
    redirect: "follow"
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  try {
    const upstreamRes = await fetch(targetUrl, init);
    const resHeaders = new Headers(upstreamRes.headers);
    resHeaders.set("Access-Control-Allow-Origin", "*");
    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers: resHeaders
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "API upstream unavailable: " + err.message }), {
      status: 502,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
