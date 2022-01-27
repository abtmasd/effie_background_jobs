require("../dotEnvConfig");


import server from "./app";
const port = normalizePort(process.env.PORT);
server.listen(port, () => {
  console.log(`🚀 Bull Server running in: `);
  console.log(`|__Internal http://localhost:${process.env.PORT} ✔️`);
  console.log(`|__External http://${results.LocalIp}:${port} ✔️`);

});
server.on("error", onError);

//GET LOCAL IP
const { networkInterfaces } = require("os");
const nets = networkInterfaces();
const results = Object.create(null); // '{}'
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === "IPv4" && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results.LocalIp = net.address;
      results[name].push(net.address);
    }
  }
}

//NOMALIZAÇÃO DA PORTA
function normalizePort(val: any) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

//ON ERROR
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requer privilegio maior");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " já está em uso");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export default server;
