import { Server } from "./server";

let server = new Server().app;
let host="192.168.1.104";

let port = 3000;

server.listen(port, host, () => {
    console.log(`EBUN : PORT ${port}`);
});






