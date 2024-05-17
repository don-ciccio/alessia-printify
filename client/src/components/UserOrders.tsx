import { useTranslation } from "@/app/i18n";
import { authOptions } from "@/libs/auth/auth";
import { Orders } from "@/models/Orders";
import { OrdersDocument, OrderSubmissionProperties } from "@/types/types";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";

interface propsType {
    lng: string;
}

const UserOrders: React.FC<propsType> = async ({ lng }) => {
    const labelStyles = "block text-base mb-1";
    const { t } = await useTranslation(lng, "checkout");

    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user._id;
    const userOrders: OrdersDocument | null = await Orders.findOne({ userId });

    if (userOrders === undefined || userOrders === null) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-[80vh] gap-2 px-4'>
                <h2 className='mb-6 text-4xl font-bold'>NO ORDERS YET</h2>
                <p className='mb-4 text-lg'>
                    To create an order add a product to the cart and buy it!
                </p>
                <Link
                    className='flex font-medium	 items-center bg-[#0C0C0C] justify-center text-sm min-w-[160px] max-w-[160px] h-[40px] px-[10px] rounded-md border border-solid border-[#2E2E2E] transition-all hover:bg-[#1F1F1F] hover:border-[#454545]'
                    href='/'
                >
                    Start
                </Link>
            </div>
        );
    }
    return (
        <div className='grid gap-4 py-4'>
            {userOrders.orders.map(
                (order: OrderSubmissionProperties, index: number) => (
                    <div
                        key={index}
                        className='w-full transition duration-150 border border-solid rounded-lg border-border-primary bg-background-secondary hover:bg-color-secondary'
                    >
                        <Link
                            href={`/orders/${order.external_id}?items=${order.line_items.length}`}
                            className='flex flex-col justify-between h-full gap-2 px-4 py-5 text-accent hover:text-blackish'
                        >
                            <p className=''>{`Order number:  ${
                                order.external_id
                            }  | Items: ${order.line_items.reduce(
                                (total, product) => total + product.quantity,
                                0
                            )} `}</p>
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};

export default UserOrders;
