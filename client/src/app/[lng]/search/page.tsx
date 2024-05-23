import ProductCard from "@/components/ProductCard";
import { Product } from "@/libs/printify/client";

interface SearchProps {
    searchParams: { [key: string]: string | undefined };
    params: { lng: string };
}

const normalizeText = (text: string): string => {
    return text
        .replace(/[-_]/g, "")
        .replace(/[^\w\s]/g, "")
        .toLowerCase();
};

async function getData(): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const Search: React.FC<SearchProps> = async ({ searchParams, params }) => {
    const products = await getData();
    let filteredProducts: Product[] = [];

    if (products) {
        filteredProducts = products.data.filter((product: Product) =>
            normalizeText(product.title).includes(
                normalizeText(searchParams.q || "")
            )
        );
    }

    return (
        <div className='container py-16'>
            <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item: Product) => {
                        const minPrice = item.variants.reduce((prev, curr) =>
                            prev.price < curr.price ? prev : curr
                        );
                        return (
                            <ProductCard
                                lng={params.lng}
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                img={item.images[0].src}
                                desc={item.description}
                                price={minPrice.price}
                                tags={item.tags}
                            />
                        );
                    })
                ) : (
                    <div className='h-screen w-full'>
                        <h3 className='text-base text-center'>
                            No products found for &quot;{searchParams.q}&quot;
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
