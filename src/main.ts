import express from "express";
import { getRecipes } from "./services/get_recipes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/recipes", async (req, res) => {
  const { ingredients, style } = req.body;

  // Fetching to API
  const result = await getRecipes({ ingredients, style });
  const parsedResult = JSON.parse(result.choices[0].message.content as string);

  return res.json({ result: parsedResult });
});

app.listen(8000, () => console.log("Server Running at 8000"));
