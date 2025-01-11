import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { marked } from "marked";
import * as cheerio from "cheerio";

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
    <div class="tool-pros_cons">
      ${formattedText}
    </div>
  `;
}
function parseProsAndCons(html) {
  const $ = cheerio.load(html);

  const pros = [];
  const cons = [];

  const prosList = $(".tool-pros_cons").find('p:contains("Pros")').next("ol");
  const consList = $(".tool-pros_cons").find('p:contains("Cons")').next("ol");

  if (prosList) {
    prosList.find("li").each((_, item) => {
      const title = $(item).find("strong").text().trim();
      const description = $(item).text().replace(title, "").trim();
      if (title && description) {
        pros.push(`${title}: ${description}`);
      }
    });
  }

  if (consList) {
    consList.find("li").each((_, item) => {
      const title = $(item).find("strong").text().trim();
      const description = $(item).text().replace(title, "").trim();
      if (title && description) {
        cons.push(`${title}: ${description}`);
      }
    });
  }
  return [pros, cons];
}

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateProsCons(title, link, description, categories) {
  try {
    const prompt = `
    Link: ${link}
    Title: ${title}
    Description: ${description}
    Categories: ${categories}
  
    Your Task: Based on the provided information, generate 5 pros and 5 cons for the AI tool. Keep each point under 15 words, clearly highlighting both the strengths and weaknesses of the tool. Make sure the content is:
  
    1. **SEO-Friendly**: Include relevant keywords, phrases, and terms that are commonly searched by users interested in this AI tool category.
    2. **Original and Engaging**: Write in an informative and user-focused manner, maintaining clarity and readability.
    3. **Clear and Professional Tone**: The pros and cons should be presented professionally, making it easy for readers to quickly grasp the tool's value and limitations.
  
    Ensure the content is original, insightful, and tailored to users interested in learning more about this AI tool.
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

export async function generateProsConsLLM(
  title,
  link,
  description,
  categories
) {
  if(title===""&& link==="" && description===""&& categories===""){
    return false
  }
  const pros_cons = await generateProsCons(
    title,
    link,
    description,
    categories.join(",")
  );

  const html = formatResponse(pros_cons);
  return parseProsAndCons(html);
}
