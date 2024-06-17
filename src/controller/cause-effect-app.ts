import { Request, Response } from "express";
import path from "path";
import { listPeoples } from "../respositories/Cause-Effect-App/repository";

export const causeEffectAppController = (req: Request, res: Response) => {
    
    const filePath = path.join('pages', 'Cause-Effect-App', 'index');

    res.render(filePath);
};

export const loadPeoples = (req: Request, res: Response) => {
    
    const list = listPeoples();

    res.status(200).json(list);
};