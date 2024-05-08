import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";

export default function Home({
    params: { lng },
}: {
    params: {
        lng: string;
    };
}) {
    return (
        <main>
            <Hero />
            <NewProducts lng={lng} />
        </main>
    );
}
