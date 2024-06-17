import fs from "fs/promises";
import path from "path";

export async function listPeoples ():Promise<JSON> {
    const dataPath = path.resolve(__dirname, "..","..","data","Cause-Effect-App", "data.json");

    const file = await fs.readFile(dataPath, "utf-8");

    return JSON.parse(file)
};