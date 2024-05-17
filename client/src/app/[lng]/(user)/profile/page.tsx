import EditProfile from "@/components/EditProfile";
import React from "react";
import { Tab, Tabs } from "@/components/ui/Tabs";
import UserOrders from "@/components/UserOrders";
const Profile = ({ params }: { params: { lng: string } }) => {
    return (
        <div className='mx-auto'>
            <div className='px-6 pt-6 pb-12 lg:max-w-6xl max-w-3xl mx-auto min-h-screen'>
                <Tabs>
                    <Tab label='Profile'>
                        <EditProfile lng={params.lng} />
                    </Tab>
                    <Tab label='Orders'>
                        <UserOrders lng={params.lng} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;
