// 🔥 Replace these with your Webshare details
const username = "dsotjcda";
const password = "9v5acasa6tdg";

// 🔥 Add all your proxies here
const proxyList = [
  { ip: "142.111.48.253", port: "7030" },
  { ip: "31.59.20.176", port: "6754" },
  { ip: "23.95.150.145", port: "6114" },
  { ip: "198.23.239.134", port: "6540" },
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
