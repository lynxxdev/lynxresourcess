import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).send("Use POST.");

    const { filename, content } = req.body;

    if (!filename || !content)
        return res.status(400).send("Missing data.");

    await kv.set(`file_${filename}`, content);
    await kv.set(`version_${filename}`, Date.now());

    return res.json({ status: "updated", file: filename });
}