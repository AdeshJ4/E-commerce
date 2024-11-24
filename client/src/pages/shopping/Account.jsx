import React from "react";
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Addresses from "@/components/shopping/Addresses";
import ShoppingOrders from "@/components/shopping/Orders";


const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders" className="flex  items-center justify-center flex-col">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders"><ShoppingOrders /></TabsContent>
            <TabsContent value="address"><Addresses /></TabsContent>
          </Tabs>
        </div>
      </div>


    </div>
  );
};

export default ShoppingAccount;
