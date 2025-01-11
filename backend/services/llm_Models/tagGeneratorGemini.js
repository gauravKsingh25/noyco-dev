import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;
if (!API_KEY_GEMINI) {
  throw new Error(
    "API key for Google Generative AI is missing. Set API_KEY in environment variables."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateTags(title, link, description, categories) {
  try {
    const prompt = `
    Analyze the provided AI TOOL website's data to generate at least 10 relevant tags based on its link, title, categories, and description. Focus on identifying keywords that accurately represent the website’s purpose. Provide only the tags (keywords) without any explanations or extra information:
      Link: ${link}
      Title: ${title}
      Description: ${description}
      Categories:${categories}
  `;

    const result = await model.generateContent(prompt);
    if (result.response.candidates[0].content.parts[0]) {
      return result.response.candidates[0].content.parts[0].text;
    } else {
      return "No tags generated.";
    }
  } catch (error) {
    console.error("Error generating tags:", error.message);
    return "Error generating tags.";
  }
}

export async function generateTagsLLM(title, link, description, categories) {
  if (title === "" && link === "" && description === "" && categories === "") {
    return false;
  }
  const tags = await generateTags(
    title,
    link,
    description,
    categories.join(",")
  );

  return tags;
}
