import { Product } from "@/libs/printify/client";
import axios from "axios";
import { atom, map } from "nanostores";

const URL = process.env.NEXT_PUBLIC_APP_URL;

export const loadingProductList = atom<boolean>(false);
export const errorProductList = atom<string | undefined>(undefined);

export const loadingGetProduct = atom<boolean>(false);
export const errorGetProduct = atom<string | undefined>(undefined);
export const productGetState = map<Product>();

export const getProductRequest = async (
    id: string,
    ui: boolean = true
): Promise<Product | undefined> => {
    {
        ui && errorGetProduct.set(undefined);
    }
    {
        ui && loadingGetProduct.set(true);
    }
    try {
        const response = await axios.get<Product>(`${URL}/api/products/${id}`);
        {
            ui && productGetState.set(response?.data);
        }

        return response?.data;
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        {
            ui && errorGetProduct.set(message);
        }
        return undefined;
    } finally {
        loadingGetProduct.set(false);
    }
};
