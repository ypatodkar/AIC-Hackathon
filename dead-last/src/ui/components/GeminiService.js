import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyBye4qOZDR7Ma5CwANfcvHDCR9mXevqzGE" // must match your .env key
);

export async function getMetaphors(subject) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
Generate exactly 3 creative metaphors for the presentation subject: "${subject}".
Each metaphor must have:
- An id (1, 2, 3)
- A creative title
- A short description (around 3-5 lines)

Strictly format your response as a JavaScript array of objects like:
[
  { id: 1, title: "Example Title 1", description: "Example description 1" },
  { id: 2, title: "Example Title 2", description: "Example description 2" },
  { id: 3, title: "Example Title 3", description: "Example description 3" }
]
Do not add any explanation or commentary outside the array.
`;

  // 1) generate
  const result = await model.generateContent(prompt);

  // 2) grab the raw text
  const raw = await result.response.text();
  console.log("🔍 Raw Gemini response:", raw);

  // 3) strip out any code fences (``` or ```javascript)
  let body = raw
    .replace(/```(?:javascript)?/g, "")
    .replace(/```/g, "")
    .trim();

  // 4) ensure it’s wrapped in [ ... ]
  if (!body.startsWith("[")) {
    body = `[${body}]`;
  }

  // 5) quote unquoted keys:  { id: → { "id":
  body = body.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

  // 6) remove any trailing commas before } or ]
  body = body.replace(/,(\s*[}\]])/g, "$1");

  console.log("🛠️  Cleaned JSON string:", body);

  // 7) parse
  try {
    const metaphors = JSON.parse(body);
    return metaphors;
  } catch (err) {
    console.error("❌ Error parsing JSON:", err);
    return [];
  }
}
