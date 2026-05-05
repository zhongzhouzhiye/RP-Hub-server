const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: '100mb' }));

// Serve static frontend files (so the server can run standalone)
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        // Allow iframe embedding for character generator
        if (filePath.endsWith('.html')) {
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        }
    }
}));

// --- Helpers ---

const sanitizeKey = (key) => {
    // Only allow alphanumeric, underscores, hyphens, dots
    // Map special characters to safe alternatives
    return key.replace(/[^a-zA-Z0-9_\-.@]/g, '_');
};

const getFilePath = (key) => {
    const safeName = sanitizeKey(key);
    return path.join(DATA_DIR, safeName + '.json');
};

// --- API Routes ---

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', version: '1.0.0' });
});

// List all stored keys
app.get('/api/keys', (req, res) => {
    try {
        const files = fs.readdirSync(DATA_DIR)
            .filter(f => f.endsWith('.json'))
            .map(f => f.replace('.json', ''));
        res.json({ keys: files });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET /api/data/:key — retrieve value by key
app.get('/api/data/*', (req, res) => {
    try {
        const key = req.params[0];
        const filePath = getFilePath(key);
        if (!fs.existsSync(filePath)) {
            return res.json({ value: null });
        }
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        res.json({ value: parsed });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// PUT /api/data/* — set value by key
app.put('/api/data/*', (req, res) => {
    try {
        const key = req.params[0];
        const { value } = req.body;
        const filePath = getFilePath(key);
        fs.writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf-8');
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// DELETE /api/data/* — delete value by key
app.delete('/api/data/*', (req, res) => {
    try {
        const key = req.params[0];
        const filePath = getFilePath(key);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`[RP-Hub Server] 运行在 http://localhost:${PORT}`);
    console.log(`[RP-Hub Server] 数据目录: ${DATA_DIR}`);
});
