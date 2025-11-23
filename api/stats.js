import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    const filename = req.query.file;
    if (!filename) return res.status(400).send("Missing file.");

    const execs = await kv.get(`exec_${filename}`) || 0;

    return res.json({ file: filename, executions: execs });
}