import { Product } from "@/libs/printify/client";
import axios from "axios";
import { atom } from "nanostores";

const URL = process.env.NEXT_PUBLIC_APP_URL;

import { ICartItem } from "@/types/types";

export const loadingAddCart = atom<boolean>(false);
export const errorAddCart = atom<string | undefined>(undefined);

export const cart = atom<Array<ICartItem> | undefined>(undefined);

const getProductRequest = async (id: string): Promise<Product | undefined> => {
    try {
        const response = await axios.get<Product>(`${URL}/api/products/${id}`);

        return response?.data;
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        console.log(message);
        return undefined;
    }
};

export const addToCart = async (
    id: string,
    variant: string,
    quantity: number
) => {
    try {
        errorAddCart.set(undefined);
        loadingAddCart.set(true);

        // Get product first
        const productResponse = await getProductRequest(id);
        const variant_id = Number(variant);
        // Variant select logic------------------------------------
        const availibleVariant = productResponse?.variants.filter(
            (variant) => variant.id === variant_id
        );

        // Define cart items from state
        const cartItems = cart?.get() || [];

        // Get existing cart iytem
        const existingCartItem = cartItems?.find(
            (item) =>
                item.id === productResponse?.id &&
                availibleVariant?.find(
                    (variant) => variant.id === item.variant_id
                )
        );
        console.log(existingCartItem);
        // Selected Cart item has been previously selected
        if (existingCartItem) {
            // Update the existing item's quantity
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            console.log(existingCartItem.quantity);
            // Update the list of cart items with the modified cart item
            const updatedCartItems = cartItems?.map((cartItem) =>
                cartItem?.id === existingCartItem.id &&
                cartItem?.variant_id === existingCartItem.variant_id
                    ? updatedCartItem
                    : cartItem
            );

            // save the changes to the state
            cart.set(updatedCartItems);
        }

        // Cart item is a new item
        if (!existingCartItem && productResponse && availibleVariant) {
            // Create a new cart item with data from server and also selected quantity
            const newCartItem: ICartItem = {
                id: productResponse?.id,
                title: productResponse?.title,
                image: productResponse?.images[0].src,
                price: availibleVariant[0].price,
                print_provider_id: productResponse?.print_provider_id,
                blueprint_id: productResponse?.blueprint_id,
                variant_id: availibleVariant[0].id,
                variant_title: availibleVariant[0].title || "",
                sku: availibleVariant[0].sku || "",
                quantity: 1,
            };

            // Update the list of cart items with the newly added cart items
            const updatedCartItems = [...cartItems, newCartItem];

            // Save the  Update to  the state
            cart.set(updatedCartItems);
        }

        localStorage.setItem("cart", JSON.stringify(cart?.get()));
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        errorAddCart.set(message);
    } finally {
        loadingAddCart.set(false);
    }
};

export const removeFromCart = async (id: string, variant_id: number) => {
    try {
        // Define cart items from state
        const cartItems = cart?.get() || [];

        const updatedCartItem = cartItems?.filter((cartItem) => {
            if (cartItem?.id === id) {
                return cartItem?.variant_id !== variant_id;
            } else {
                return cartItem?.id !== id;
            }
        });

        cart.set(updatedCartItem);

        localStorage.setItem("cart", JSON.stringify(cart?.get()));
    } catch (error) {
        console.log({ RemoveFromCartError: error });
    } finally {
    }
};

export function getTotalItems() {
    const cartItems = cart?.get() || [];
    const total: number =
        cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return total;
}
