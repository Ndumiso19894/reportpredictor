export default {
  async fetch(request) {
    const url = new URL(request.url);
    let target = url.searchParams.get("url");

    if (!target) {
      return new Response(
        "✅ Scraper Proxy ACTIVE. Add ?url=https://www.flashscore.com",
        { status: 200, headers: {"Content-Type": "text/plain"} }
      );
    }

    // 🔥 Fix B: If Flashscore normal URL, force no-JS mode
    if (target.includes("flashscore.com") && !target.includes("/x")) {
      if (target.endsWith("/")) target = target + "x";
      else target = target + "/x";
    }

    try {
      const response = await fetch(target, {
        redirect: "manual",   // 🔥 Fix A: Block Flashscore redirects
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Upgrade-Insecure-Requests": "1",
        },
      });

      const html = await response.text();

      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response("Scraping Error: " + err.toString(), {
        status: 500
      });
    }
  }
};
