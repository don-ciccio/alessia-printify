import { Express } from "express";
import dotenv from "dotenv";
import mongooseConnect from "../database/mongodb";

dotenv.config();

const port = process.env.APP_PORT;

const appSetup = async (app: Express) => {
    try {
        await mongooseConnect();

        console.log("Databases connected successfully!");

        app.listen(port, () => {
            console.log(
                `⚡️[server]: Server is running at http://localhost:${port}`
            );
        });
    } catch (error: unknown) {
        console.log("Unable to start the app!");
        console.error(error);
    }
};

export default appSetup;
