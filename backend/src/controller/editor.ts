import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import {exec} from 'child_process';
import { StatusCodes } from "../enums/statusCodes";

export async function editorController(req: Request, res: Response) {
  const codeInJSON = req.body;
  const code = JSON.stringify(codeInJSON);
  console.log(codeInJSON);
  const filePath = path.join("..", "..", "ai-model", "code.json");

  fs.writeFile(`${__dirname}/code.json`, code, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data written to file");
      const pythonFilePath = path.join(__dirname, '..', '..', '..', 'ai-model', 'compile.py');
      exec(`python3 ${pythonFilePath}`, (err, stdout, stderr) => {
         if (err) {
           console.error(`Error executing Python script: ${err.message}`);
           return;
         }
         if (stderr) {
           console.error(`Python stderr: ${stderr}`);
           return;
         }
         console.log(`Python stdout: ${stdout}`);
         console.log(__dirname);
         
         const terminalJSONPath = path.join(
           __dirname,
           "terminal.json"
         );
         fs.readFile(terminalJSONPath, 'utf8', (err, data) => {
          console.log(data);
          
          return res.status(StatusCodes.SUCCESS).json({
            data: data
          })

         })
      })
    }
  });

}
