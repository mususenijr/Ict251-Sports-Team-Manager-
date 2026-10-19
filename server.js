const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "sports.json");

let sports = [];

try {
    if (fs.existsSync(DATA_FILE)) {
        sports = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    }
} catch (error) {
    console.log("Starting with an empty roster.");
}

function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(sports, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });

        const file = path.join(__dirname, "public", "index.html");

        if (fs.existsSync(file)) {
            return res.end(fs.readFileSync(file));
        }

        return res.end("<h1>Sports Team Manager</h1><p>Website setup in progress.</p>");
    }

    if (req.url.startsWith("/api/sports")) {
        const id = Number(req.url.split("/")[3]);

        if (req.method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(sports));
        }

        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            try {
                const data = body ? JSON.parse(body) : {};

                if (req.method === "POST") {
                    const record = {
                        id: sports.length
                            ? Math.max(...sports.map(item => item.id)) + 1
                            : 1,
                        ...data,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };

                    sports.push(record);
                    saveData();

                    res.writeHead(201, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(record));
                }

                if (req.method === "PUT") {
                    const index = sports.findIndex(item => item.id === id);

                    if (index === -1) {
                        res.writeHead(404);
                        return res.end(JSON.stringify({ error: "Record not found" }));
                    }

                    sports[index] = {
                        ...sports[index],
                        ...data,
                        id,
                        updated_at: new Date().toISOString()
                    };

                    saveData();

                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(sports[index]));
                }

                if (req.method === "DELETE") {
                    const oldLength = sports.length;
                    sports = sports.filter(item => item.id !== id);
                    saveData();

                    res.writeHead(oldLength === sports.length ? 404 : 200, {
                        "Content-Type": "application/json"
                    });

                    return res.end(JSON.stringify({ message: "Delete processed" }));
                }

                res.writeHead(405);
                res.end(JSON.stringify({ error: "Method not allowed" }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });

        return;
    }

    res.writeHead(404);
    res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("Sports Team Manager running on port " + PORT);
});
