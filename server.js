const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;

// MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

const server = http.createServer((req, res) => {
  // Add CORS headers and cache control
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  let filePath = "." + req.url;

  // Default to index.html for root path
  if (filePath === "./") {
    filePath = "./index.html";
  }

  // Get file extension and corresponding MIME type
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || "application/octet-stream";

  // Check if file exists
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        // File not found - return 404
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(
          "<h1>404 Not Found</h1><p>The requested file was not found.</p>",
          "utf-8"
        );
      } else {
        // Server error
        res.writeHead(500);
        res.end("Sorry, there was an error: " + error.code + " ..\n");
      }
    } else {
      // Success - return file content
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log("Portfolio website is ready to view!");
});
