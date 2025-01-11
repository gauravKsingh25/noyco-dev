import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { marked } from "marked";
dotenv.config();

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;
if (!API_KEY_GEMINI ) {
  throw new Error(
    "API key for Google Generative AI is missing. Set API_KEY in environment variables."
  );
}

function formatResponse(inputText) {
  let formattedText = marked(inputText);

  formattedText = formattedText.replace(/```(.*?)```/gs, (match, p1) => {
    return `<pre><code class="language-javascript">${p1}</code></pre>`;
  });

  return `
    <div class="tool-description">
      ${formattedText}
    </div>
  `;
}

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateDescription(
  title,
  link,
  description,
  categories
) {
  try {
    const prompt = `
    Link: ${link}
    Title: ${title}
    Description: ${description}
    Categories: ${categories}
  
    Your Task: Based on the provided data, please generate a comprehensive and relevant description for the AI Tool. The description should be at least 300 words and provide an in-depth overview of the tool's purpose, and any relevant feature about its functionality. If a description already exists, please rephrase it while enhancing the clarity and structure, ensuring the content is original and engaging. Your description should be written in a clear, professional tone, suitable for an AI tool listing.
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

export async function generateDescriptionLLM(
  title,
  link,
  description,
  categories
) {
  
  if(title===""&& link==="" && description===""&& categories===""){
    return false
  }
  const tags = await generateDescription(
    title,
    link,
    description,
    categories.join(",")
  );

  return formatResponse(tags);
}
