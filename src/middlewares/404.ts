import { Request, Response, NextFunction } from "express";
import path from "path";

export const error404 = (req: Request, res: Response, next: NextFunction) => {
    const filePath = path.join('pages', '404', 'index');

    res.status(404).render(filePath);
};