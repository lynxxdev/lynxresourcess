import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {
        const filename = req.url.replace("/raw/", "");
        const file = await kv.get(`file_${filename}`);

        if (!file) return res.status(404).send("Arquivo não encontrado.");

        await kv.incr(`exec_${filename}`);

        res.setHeader("Content-Type", "text/plain");
        return res.send(file);

    } catch (e) {
        return res.status(500).send("Erro interno.");
    }
}