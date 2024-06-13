import { Router } from "express";

import { bin2DecController } from "../controller/bin-2-dec-controller";
import { homeController, homeRedirectController } from "../controller/home-controller";
import { borderRadiusPreviewerController } from "../controller/border-radius-previewer";
import { calculatorController } from "../controller/calculatorController";

const router = Router();

router.get("/", homeRedirectController)

router.get("/home", homeController);

router.get("/Bin2Dec-App", bin2DecController);

router.get("/Border-Radius-Previewer", borderRadiusPreviewerController);

router.get("/Calculator-App", calculatorController);

export default router;