import { Request, Response } from "express";
import path from "path";

export const christmasLightsAppController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'Christmas-Lights-App', 'index');

    res.render(filePath);
};