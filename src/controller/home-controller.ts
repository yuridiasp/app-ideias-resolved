import { Request, Response } from "express";
import path from "path";

export const homeController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'home', 'index');

    res.render(filePath);
};

export const homeRedirectController = (req: Request, res: Response) => {
    
    res.redirect("/home")
};