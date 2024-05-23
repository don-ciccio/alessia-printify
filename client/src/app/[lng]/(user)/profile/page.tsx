import EditProfile from "@/components/EditProfile";
import React from "react";
import { Tab, Tabs } from "@/components/ui/Tabs";
import UserOrders from "@/components/UserOrders";
import { useTranslation } from "@/app/i18n";
const Profile = async ({ params }: { params: { lng: string } }) => {
    const { t } = await useTranslation(params.lng, "checkout");

    return (
        <div className='mx-auto'>
            <div className='px-6 pt-6 pb-12 lg:max-w-6xl max-w-3xl mx-auto min-h-screen'>
                <Tabs>
                    <Tab label={t("profile")}>
                        <EditProfile lng={params.lng} />
                    </Tab>
                    <Tab label={t("orders")}>
                        <UserOrders lng={params.lng} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;
