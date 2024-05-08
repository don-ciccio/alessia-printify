import ShippingForm from "@/components/ShippingForm";

const Checkout = () => {
    return (
        <div className='mx-auto'>
            <div className='px-6 pt-6 pb-12 lg:max-w-6xl max-w-2xl mx-auto w-full'>
                <div
                    className='p-8 xs:p-10	 
                border border-solid border-gray-200 rounded-lg'
                >
                    <h1 className='text-2xl font-bold text-blackish mb-4'>
                        Checkout
                    </h1>
                    <ShippingForm />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
