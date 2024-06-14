import { Request, Response } from "express";
import path from "path";

export const calculatorController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'Calculator-App', 'index');

    res.render(filePath);
};