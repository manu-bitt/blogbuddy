
import dotenv from "dotenv";
dotenv.config();  

import OpenAI from "openai";

console.log("OpenAI key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing")

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const generateBlog = async (req, res) => {
  try {
    const { topic, tone = "informative", maxTokens = 700 } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ 
            message: "AI Generation is currently unavailable (Missing API Key). Please create a manual blog or contact admin." 
        });
    }

    if (!topic || typeof topic !== "string" || topic.trim().length < 3) {
      return res.status(400).json({ message: "Topic is required and should be at least 3 characters." });
    }

    const system = `You are an expert, helpful blog writer who produces clear, well-structured articles. Write in a ${tone} tone. Use headings, short paragraphs, and include an intro and conclusion.`;
    const userPrompt = `Write a complete blog post about: "${topic.trim()}". Use subheadings (H2/H3), bullet lists where relevant, and a short conclusion. Keep it reader friendly.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",           
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,              
      n: 1
    });

    const content = completion.choices?.[0]?.message?.content?.trim() ?? "";

    if (!content) {
      return res.status(500).json({ message: "AI returned empty content." });
    }

    res.json({ topic: topic.trim(), content });
  } catch (err) {
    console.error("AI generation error:", err);
    res.status(500).json({ message: "Failed to generate blog", error: err.message || err });
  }
};
