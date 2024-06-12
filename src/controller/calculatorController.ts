import { Request, Response } from "express";
import path from "path";

export const calculatorController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'Calculator', 'index');

    res.render(filePath);
};