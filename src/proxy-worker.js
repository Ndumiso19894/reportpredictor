import { rotateProxy } from './proxyRotation.js';
import { prepareHeaders } from './helpers.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let target = url.searchParams.get("url");

    if (!target) {
      return new Response(
        "✅ Rotating Proxy ACTIVE. Add ?url=https://www.flashscore.com",
        { status: 200, headers: { "Content-Type": "text/plain" } }
      );
    }

    const { username, password, ip, port } = rotateProxy();

    const proxyUrl = `http://${username}:${password}@${ip}:${port}`;

    try {
      const response = await fetch(target, {
        method: "GET",
        redirect: "manual",
        headers: prepareHeaders(),
        cf: { fetchVia: proxyUrl }
      });

      const html = await response.text();
      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return new Response("❌ Proxy Error: " + e.toString(), { status: 500 });
    }
  }
};
