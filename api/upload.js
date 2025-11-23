import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).send("Use POST.");

    try {
        const { filename, content } = req.body;
        if (!filename || !filename.endsWith(".lua"))
            return res.status(400).send("Envie um arquivo .lua válido.");

        // Salva no KV
        await kv.set(`file_${filename}`, content);
        await kv.set(`version_${filename}`, Date.now());
        await kv.set(`exec_${filename}`, 0);

        return res.json({
            status: "success",
            loadstring: `loadstring(game:HttpGet("https://${req.headers.host}/api/raw/${filename}"))()`
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send("Erro interno.");
    }
}