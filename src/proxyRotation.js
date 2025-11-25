// 🔥 Replace these with your Webshare details
const username = "YOUR_USERNAME";
const password = "YOUR_PASSWORD";

// 🔥 Add all your proxies here
const proxyList = [
  { ip: "IP_1", port: "PORT_1" },
  { ip: "IP_2", port: "PORT_2" },
  { ip: "IP_3", port: "PORT_3" },
  { ip: "IP_4", port: "PORT_4" },
  { ip: "IP_5", port: "PORT_5" }
];

export function rotateProxy() {
  const selected = proxyList[Math.floor(Math.random() * proxyList.length)];
  return {
    username,
    password,
    ip: selected.ip,
    port: selected.port
  };
}
