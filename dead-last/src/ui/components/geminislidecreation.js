// src/utils/geminislidecreation.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your real key
const genAI = new GoogleGenerativeAI("AIzaSyBye4qOZDR7Ma5CwANfcvHDCR9mXevqzGE");

/**
 * Generate a 5-slide deck for the given subject,
 * returning an array of { title, text } objects.
 */
export async function getSlideDeck(subject) {
  // 1) Build the Gemini prompt
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
Generate exactly 5 JSON slides for a presentation on "${subject}".
Each slide should be an object with:
- title: a short, descriptive heading
- text: one or two sentences explaining the slide

Strictly format your response as a JavaScript array of objects, e.g.:

[
  { title: "Slide 1 – Introduction", text: "…" },
  { title: "Slide 2 – …",         text: "…" },
  …
]

Do not include any commentary or markdown—just the raw array.
`;

  // 2) Fire the API
  const result = await model.generateContent(prompt);

  // 3) Extract raw string from the response object
  //    (adjust these paths if your SDK version differs)
  const raw = await result.response.text();
  console.log("🔍 Raw Gemini slides response:", raw);

  // 4) Clean up code fences and stray text
  let body = raw
    .replace(/```(?:javascript)?/g, "")
    .replace(/```/g, "")
    .trim();

  // 5) Ensure it starts with [ so JSON.parse works
  if (!body.startsWith("[")) {
    body = `[${body}]`;
  }

  // 6) Quote unquoted keys, e.g. { title: → { "title":
  body = body.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

  // 7) Remove trailing commas before } or ]
  body = body.replace(/,(\s*[}\]])/g, "$1");

  console.log("🛠️  Cleaned slides JSON string:", body);

  // 8) Parse into JS
  try {
    const slides = JSON.parse(body);
    return slides; // [ { title, text }, … ×5 ]
  } catch (err) {
    console.error("❌ Error parsing slides JSON:", err);
    return [];
  }
}
