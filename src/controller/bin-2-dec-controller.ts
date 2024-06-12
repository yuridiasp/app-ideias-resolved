import { Request, Response } from "express";
import path from "path";

export const bin2DecController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'Bin2Dec-App', 'index');

    res.render(filePath);
};