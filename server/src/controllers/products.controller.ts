import { Router, Request, Response } from "express";
import { PrintifyClient } from "../printify/client";

const controller = Router();

const client = new PrintifyClient({
    token: process.env.PRINTIFY_TOKEN!,
    version: "v1",
});

controller
    .get("/", async (req: Request, res: Response) => {
        const { data } = await client.callApi({
            method: "GET",
            path: "/shops.json",
        });

        res.send(data);
    })

    .get("/products", async (req: Request, res: Response) => {
        const { data: shop } = await client.getShops();

        if (!shop) {
            return res.status(400).send({ message: "Products not found" });
        }

        const { data } = await client.getAllProducts(shop[0].id);
        res.send(data);
    })
    .get("/products/:id", async (req: Request, res: Response) => {
        const { data: shop } = await client.getShops();

        if (!shop) {
            return res.status(400).send({ message: "Products not found" });
        }

        const { data } = await client.getProductById(shop[0].id, req.params.id);
        res.send(data);
    });

export default controller;
