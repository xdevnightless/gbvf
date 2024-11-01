// Import express, http, and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the express "app"
const app = express();

// Create an HTTP server
const httpServer = http.createServer();

// Define the port to listen on
const port = 8080;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve UV, baremux, and epoxy files
app.use("/uv/", express.static(uvPath));
app.use("/baremux/", express.static(baremuxPath));
app.use("/epoxy/", express.static(epoxyPath));

// Listen for requests on the HTTP server
httpServer.on('request', (req, res) => {
    // Make express handle all of the requests
    app(req, res);
});

// Listen for WebSocket upgrades on the HTTP server
httpServer.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        // Route the request to the wisp server if the URL ends in /wisp/
        wisp.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

// When the server is ready, log that it is ready
httpServer.on('listening', () => {
    console.log(`Server listening on http://localhost:${port}`);
});

// Start the HTTP server
httpServer.listen({
    port: port 
});
