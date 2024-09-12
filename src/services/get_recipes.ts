import { openai } from "../utils/openai";

interface Recipes {
  ingredients: string;
  style: string;
}

export async function getRecipes({ ingredients, style }: Recipes) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are a cooking expert, you will be given with user ingredients, and style, Please generate a recipe only with provided ingredients.\n\nIMPORTANT :\n- You are allowed to add additional ingredients as long as it's an aside ingredients.\n- Do not include any ingredients such as Alcohol, Arak, and Non-Halal Ingredients\n\nIMPORTANT :\nALWAYS RESPONSE WITH VALID JSON OBJECT WITH FOLLOWING KEYS : dishName, ingredients (string Array), howToMake (string Array)\n\nIMPORTANT:\nDO NOT INCLUDE ```json as RESPONSE\n\nCRITICAL:\nBefore answer, always check if provided ingredients is edible, if not, ALWAYS EXCLUDE!",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Buat recipe dengan bahan: ${ingredients} dalam Style: ${style}`,
          },
        ],
      },
    ],
    temperature: 1, // 1 -> Creative, 0 -> Repeated
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "text",
    },
  });

  return response;
}
