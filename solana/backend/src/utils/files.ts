import excel from "exceljs";
import path from "path";
import fs from "fs";
import { IInvestor } from "../models/investor";
import { logger } from "../config";

const folder = "temp";
export function writeInvestorsToFile(
  filename: string,
  data: Array<IInvestor>
): Promise<string> {
  return new Promise(async (resolve, reject) => {
      try{
        if (!filename || filename == "") {
            return reject("Error: filename can not be null or empty");
          }
          if (!data || data.length == 0) {
            return reject("Error: data is null or empty");
          }
          
          let workbook = new excel.Workbook(); //creating workbook
          let worksheet = workbook.addWorksheet("Investors"); //creating worksheet
      
          worksheet.columns = [
            { header: "did", key: "did", width: 30 },
            { header: "email", key: "email", width: 30 },
            { header: "name", key: "name", width: 30 },
            { header: "ethAddress", key: "ethAddress", width: 30 },
            { header: "twitterHandle", key: "twitterHandle", width: 20 },
            { header: "telegramHandle", key: "telegramHandle", width: 20 },
            { header: "projectId", key: "projectId", width: 20 },
            { header: "tweetUrl", key: "tweetUrl", width: 40 },
            { header: "hasTwitted", key: "hasTwitted", width: 10 },
            { header: "hasJoinedTGgroup", key: "hasJoinedTGgroup", width: 10 },
            {
              header: "isVerfiedByHypersign",
              key: "isVerfiedByHypersign",
              width: 30,
            },
            {
              header: "isVerificationComplete",
              key: "isVerificationComplete",
              width: 30,
            },
          ];
      
          worksheet.addRows(data);
          worksheet.getRow(1).font = {bold: true}
      
          const fname = path.join(folder, filename + ".csv");
          logger.info("File.ts:: writeInvestorsToFile(): fname = "+ fname);

          await workbook.csv.writeFile(fname);
          
          const filePath = path.resolve(__dirname,"../../" , fname);
          logger.info("File.ts:: writeInvestorsToFile(): filePath = "+ filePath);
          resolve(filePath);
      }catch(e){
          reject(e)
      }
  });
}


export function deleteFile(filePath){
    if(filePath){
        fs.unlink(filePath, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}