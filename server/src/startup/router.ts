import { Express, Request, Response } from "express";
import productsRouter from "../controllers/products.controller";
const routerSetup = (app: Express) =>
    app
        .get("/", async (req: Request, res: Response) => {
            res.send("Hello Printify!");
        })
        .use("/api", productsRouter);

export default routerSetup;
