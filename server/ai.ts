import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  return new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });
}

export async function analyzeText(text: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a sentiment analysis expert specializing in construction industry feedback. Analyze the sentiment of the text and provide a rating from 1 to 5 stars, a confidence score between 0 and 1, and a brief summary of key insights. Respond with JSON in this format: { 'rating': number, 'confidence': number, 'summary': string }",
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating || 3))),
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      summary: result.summary || "Analysis completed",
      sentiment: Math.max(1, Math.min(5, Math.round(result.rating || 3)))
    };
  } catch (error) {
    throw new Error("Failed to analyze text: " + (error as Error).message);
  }
}

export async function generateContent(prompt: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer specializing in the construction industry. Create high-quality, engaging content tailored for construction businesses including contractors, roofers, plumbers, and home improvement professionals. Focus on practical value, professionalism, and industry-specific terminology.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
    });

    return {
      content: response.choices[0].message.content || "Content generation completed"
    };
  } catch (error) {
    throw new Error("Failed to generate content: " + (error as Error).message);
  }
}

export async function analyzeBusinessScenario(description: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a business consultant specializing in the construction industry. Provide strategic insights, market analysis, and actionable recommendations for construction businesses. Focus on practical advice for contractors, roofers, plumbers, and home improvement professionals. Provide insights as a string and up to 5 key recommendations as an array.",
        },
        {
          role: "user",
          content: `Analyze this business scenario for a construction professional: ${description}. Provide detailed insights and specific recommendations.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      insights: result.insights || "Business analysis completed",
      recommendations: Array.isArray(result.recommendations) 
        ? result.recommendations.slice(0, 5)
        : ["Focus on customer satisfaction", "Invest in quality tools", "Build strong referral networks"]
    };
  } catch (error) {
    throw new Error("Failed to analyze business scenario: " + (error as Error).message);
  }
}