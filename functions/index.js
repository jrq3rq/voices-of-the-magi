// console.log("Loading index.js at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
// console.log("Requiring plugins...");
// require("dotenv").config(); // Load .env file
// const functions = require("firebase-functions");
// const fetch = require("node-fetch");
// const admin = require("firebase-admin");
// admin.initializeApp();

// // Check if running in emulator
// const isEmulator = functions.config().emulator ? functions.config().emulator.running : false;

// console.log("Requiring Magi prompts...");
// const rolePrompts = require("./magi/prompts");

// console.log("Setting API keys from .env...");
// const GROK_API_URL = process.env.GROK_API_URL;
// const GROK_API_KEY = process.env.GROK_API_KEY;

// if (!GROK_API_URL || !GROK_API_KEY) {
//   console.log("Error: GROK_API_URL or GROK_API_KEY not found in .env");
//   throw new Error("API configuration missing. Ensure .env file contains GROK_API_URL and GROK_API_KEY.");
// }

// // General rate limit configuration (temporary test limit)
// const MAX_CALLS_PER_DAY = 2; // Temporary test limit, revert to 50 later
// const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
// let callCount = 0;
// let lastReset = Date.now();

// // Health Check Endpoint
// console.log("Defining healthCheck endpoint...");
// exports.healthCheck = functions.https.onRequest((req, res) => {
//   console.log("Inside healthCheck endpoint...");
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "GET,OPTIONS");
//   res.set("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     console.log("Handling OPTIONS request for healthCheck...");
//     return res.status(200).send();
//   }

//   console.log("Sending healthCheck response...");
//   res.status(200).json({ status: "ok", timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) });
// });

// // Chat Endpoint with General Rate Limiting
// console.log("Defining chat endpoint...");
// exports.chat = functions.https.onRequest(async (req, res) => {
//   console.log("Inside chat endpoint...");
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "POST,OPTIONS");
//   res.set("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     console.log("Handling OPTIONS request for chat...");
//     return res.status(200).send();
//   }

//   const { message, roleId } = req.body;
//   console.log("Received chat request:", { message, roleId });

//   if (!message || typeof message !== "string" || message.trim().length === 0) {
//     console.log("Invalid message detected");
//     return res.status(400).json({ reply: "Please provide a valid message." });
//   }

//   const rolePrompt = rolePrompts[roleId];
//   if (!rolePrompt) {
//     console.log("Invalid roleId detected");
//     return res.status(400).json({ reply: "Invalid Magi selected." });
//   }

//   const now = Date.now();
//   if (now - lastReset >= RESET_INTERVAL) {
//     console.log("Resetting call count due to time elapsed");
//     callCount = 0;
//     lastReset = now;
//   }

//   if (callCount >= MAX_CALLS_PER_DAY) {
//     console.log("Global rate limit exceeded, returning 429 with reply:", { reply: "Rate limit reached. Please try again after 24 hours." });
//     return res.status(429).json({ reply: "Rate limit reached. Please try again after 24 hours." });
//   }

//   callCount++;
//   console.log(`Call count: ${callCount}`); // Log for monitoring

//   try {
//     console.log("Making Grok API call...");
//     const response = await fetch(GROK_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${GROK_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "grok-3", // Replace with actual Grok model
//         temperature: 0.4,
//         messages: [
//           { role: "system", content: rolePrompt },
//           { role: "user", content: message.trim() },
//         ],
//       }),
//     });

//     console.log("Grok API response status:", response.status);

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Grok API response received");
//       let reply = "No response.";
//       if (data && data.choices && data.choices[0]?.message?.content) {
//         reply = data.choices[0].message.content;
//       } else {
//         console.log("Unexpected response format");
//       }
//       console.log("Sending successful chat response");
//       return res.json({ reply });
//     } else {
//       const errorText = await response.text();
//       console.log(`Grok API error: ${errorText}`);
//       return res.status(500).json({ reply: "The stars are silent right now. Please try again later." });
//     }
//   } catch (error) {
//     console.log(`Grok API error: ${error.message}`);
//     return res.status(500).json({ reply: "The stars are silent right now. Please try again later." });
//   }
// });
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
        body: JSON.stringify({ model: "grok-3", temperature: 0.4, messages: [{ role: "system", content: rolePrompt }, { role: "user", content: message.trim() }] }),
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