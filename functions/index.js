// Force redeploy at 2025-07-03 13:55
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
require("dotenv").config();
const cors = require("cors")({ origin: true }); // Enable CORS for all origins

admin.initializeApp();

const rolePrompts = require("./magi/prompts");

const GROK_API_URL = process.env.GROK_API_URL;
const GROK_API_KEY = process.env.GROK_API_KEY;

if (!GROK_API_URL || !GROK_API_KEY) {
  console.log("Error: GROK_API_URL or GROK_API_KEY not found in .env");
  throw new Error("API configuration missing. Ensure .env file contains GROK_API_URL and GROK_API_KEY.");
}

const MAX_CALLS_PER_DAY = 100; // Keep at 100 as requested
const RESET_INTERVAL = 24 * 60 * 60 * 1000;
let callCount = 0;
let lastReset = Date.now();

console.log("Defining test endpoint...");
exports.test = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).json({ message: "Emulator is running on 5003" });
  });
});

console.log("Defining healthCheck endpoint...");
exports.healthCheck = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.status(200).json({ status: "ok", timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) });
  });
});

console.log("Defining chat endpoint...");
exports.chat = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { message, roleId } = req.body;
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ reply: "Please provide a valid message." });
    }
    const rolePrompt = rolePrompts[roleId];
    if (!rolePrompt) {
      return res.status(400).json({ reply: "Invalid Magi selected." });
    }
    const now = Date.now();
    if (now - lastReset >= RESET_INTERVAL) { callCount = 0; lastReset = now; }
    if (callCount >= MAX_CALLS_PER_DAY) {
      return res.status(429).json({ reply: "Rate limit reached. Please try again after 24 hours." });
    }
    callCount++;
    try {
      const response = await fetch(GROK_API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${GROK_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "grok-3", temperature: 0.5, messages: [{ role: "system", content: rolePrompt }, { role: "user", content: message.trim() }] }),
      });
      if (response.ok) {
        const data = await response.json();
        let reply = "No response.";
        if (data.choices && data.choices[0]?.message?.content) reply = data.choices[0].message.content;
        return res.json({ reply });
      } else {
        const errorText = await response.text();
        return res.status(500).json({ reply: "The stars are silent right now. Please try again later." });
      }
    } catch (error) {
      return res.status(500).json({ reply: "The stars are silent right now. Please try again later." });
    }
  });
});