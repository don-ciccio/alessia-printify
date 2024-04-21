import axios from "axios";
import { atom } from "nanostores";
import { type Product } from "../types";

const URL = "http://localhost:5211";

interface ICartItem {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

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

export const addToCart = async (id: string, quantity: number) => {
    try {
        errorAddCart.set(undefined);
        loadingAddCart.set(true);

        // Get product first
        const productResponse = await getProductRequest(id);

        // Define cart items from state
        const cartItems = cart?.get() || [];

        // Get existing cart iytem
        const existingCartItem = cartItems?.find(
            (item) => item.id === productResponse?.id
        );

        // Selected Cart item has been previously selected
        if (existingCartItem) {
            // Update the existing item's quantity
            const updatedCartItem = { ...existingCartItem, quantity };

            // Update the list of cart items with the modified cart item
            const updatedCartItems = cartItems?.map((cartItem) =>
                cartItem?.id === existingCartItem.id
                    ? updatedCartItem
                    : cartItem
            );

            // save the changes to the state
            cart.set(updatedCartItems);
        }

        // Cart item is a new item
        if (!existingCartItem && productResponse) {
            // Create a new cart item with data from server and also selected quantity
            const newCartItem: ICartItem = {
                id: productResponse?.id,
                title: productResponse?.title,
                image: productResponse?.images[0].src,
                price: productResponse?.variants[0].price,
                quantity,
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

export const removeFromCart = async (id: string) => {
    try {
        // Define cart items from state
        const cartItems = cart?.get() || [];

        const updatedCartItem = cartItems?.filter(
            (cartItem) => cartItem?.id !== id
        );
        cart.set(updatedCartItem);

        localStorage.setItem("cart", JSON.stringify(cart?.get()));
    } catch (error) {
        console.log({ RemoveFromCartError: error });
    } finally {
    }
};
