import { Request, Response } from "express";
import path from "path";

export const borderRadiusPreviewerController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'Border-Radius-Previewer', 'index');

    res.render(filePath);
};