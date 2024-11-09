import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export async function editorController(req: Request, res: Response) {
  const codeInJSON = req.body;
  const code = JSON.stringify(codeInJSON);
  console.log(codeInJSON);
  const filePath = path.join("..", "..", "ai-model", "code.json");
  console.log(__dirname);

  fs.writeFile(`${__dirname}/code.json`, code, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data written to file");
    }
  });
}
