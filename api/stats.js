import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {
        // Lista todos os arquivos armazenados
        const keys = await kv.keys("file_*");
        const files = [];
        for (const key of keys) {
            const filename = key.replace("file_", "");
            const execs = await kv.get(`exec_${filename}`) || 0;
            files.push({ filename, executions: execs });
        }
        return res.json(files);
    } catch (e) {
        return res.status(500).send("Erro interno.");
    }
}