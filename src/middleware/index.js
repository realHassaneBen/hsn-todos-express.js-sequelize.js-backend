import { Router } from "express";
import bodyParser from "./BodyParser.js";
import passport from "./Passport.js";
import sequelize from "./Sequelize";
import cors from "cors";

const router = Router();

const corsConfig = {
    origin: true,
    credentials: true,
};

router.use(cors(corsConfig));
router.options("*", cors(corsConfig));
router.use(sequelize);
router.use(bodyParser);
router.use(passport);

export default router;
