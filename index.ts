import express from "express";
const app = express();
import dotenv from "dotenv";
import appSetup from "./src/startup/init";

import routerSetup from "./src/startup/router";
import securitySetup from "./src/startup/security";
dotenv.config();

appSetup(app);
securitySetup(app, express);
routerSetup(app);
