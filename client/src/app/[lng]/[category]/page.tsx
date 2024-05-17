import ProductCard from "@/components/ProductCard";
import { Product } from "@/libs/printify/client";

type Props = {
    params: {
        category: string;
        lng: string;
    };
};

async function getData(category: string): Promise<any> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/${category}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-cache",
        }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

const CategoryPage = async ({ params }: Props) => {
    return (
        <section className='pt-14'>
            <CategoryProducts category={params.category} lng={params.lng} />
        </section>
    );
};

const CategoryProducts = async ({
    category,
    lng,
}: {
    category: string;
    lng: string;
}) => {
    const filter = await getData(category);

    return (
        <div className='container pb-16'>
            <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10'>
                {filter.length > 0 ? (
                    filter.map((item: Product) => {
                        const minPrice = item.variants.reduce((prev, curr) =>
                            prev.price < curr.price ? prev : curr
                        );
                        return (
                            <ProductCard
                                lng={lng}
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
                    <div className='h-screen'>
                        <h3 className='text-base text-center'>
                            No products found for &quot;{category}&quot;
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
