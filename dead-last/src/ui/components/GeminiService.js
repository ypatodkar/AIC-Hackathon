import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyBye4qOZDR7Ma5CwANfcvHDCR9mXevqzGE"); // ⬅️ Replace with your API key

export async function getMetaphors(subject) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
Generate 3 metaphors for the following presentation subject: "${subject}".
Each metaphor should have:
- A creative title
- A short description (3-4 lines)
Format your response exactly as a JavaScript array of objects like:
[
  { id: 1, title: "Title 1", description: "Description 1" },
  { id: 2, title: "Title 2", description: "Description 2" },
  { id: 3, title: "Title 3", description: "Description 3" }
]
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Sometimes Gemini might give extra ``` marks, so we clean them
  const cleanedText = text.replace(/```(javascript)?/g, "").trim();

  try {
    const metaphors = JSON.parse(cleanedText);
    return metaphors;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    return [];
  }
}
