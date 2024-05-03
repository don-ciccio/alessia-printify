import { Product } from "@/libs/printify/client";
import { IReview } from "@/types/types";
import axios from "axios";
import { atom, map } from "nanostores";

const URL = process.env.NEXT_PUBLIC_APP_URL;

export const loadingProductList = atom<boolean>(false);
export const errorProductList = atom<string | undefined>(undefined);

export const loadingGetProduct = atom<boolean>(false);
export const errorGetProduct = atom<string | undefined>(undefined);
export const productGetState = map<Product>();

export const loadingReviewProduct = atom<boolean>(false);
export const errorReviewProduct = atom<string | undefined>(undefined);
export const productReviewState = map<IReview>();

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

export const reviewProductRequest = async (
    id: string,
    rating: string,
    comment: string
): Promise<IReview | undefined> => {
    errorReviewProduct.set(undefined);
    loadingReviewProduct.set(true);

    try {
        const response = await axios.post<IReview>(
            `${URL}/api/products/${id}/reviews`,
            { rating: Number(rating), comment }
        );

        productReviewState.set(response?.data);

        return response?.data;
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        errorReviewProduct.set(message);

        return undefined;
    } finally {
        loadingReviewProduct.set(false);
    }
};
