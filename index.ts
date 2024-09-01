import express from "express";
import { ToggleController } from "./src/controllers/toggle_controller";
import fs from 'fs';
import https from 'https';

const jwt = require('jsonwebtoken');
const app = express();

const controller = new ToggleController()
app.use(express.json())

const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token.replace("Bearer ", ""), Bun.env.API_TOKEN, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

app.get("/v1/toggle/search", async (req, res) => {
    const name = req.query.name
    const result = await controller.list(name?.toString() ?? null)
    return res.send(result)
});

app.put("/v1/toggle/:id", verifyToken, async (req, res, next) => {
    try {
        const result = await controller.update(req.body, req.params.id)
        return res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e });
    }
});

app.post("/v1/toggle", verifyToken, async (req, res) => {
    try {
        const result = await controller.create(req.body)
        return res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e });
    }
});

// Configuração do servidor HTTPS
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
};
if (Bun.env.ENVIRONMENT == "prod") {
    https.createServer(options, app).listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
} else {
    app.listen(8080)
    console.log('HTTP Server running on port 8080');
}
