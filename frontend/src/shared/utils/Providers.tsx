"use client";
import React from 'react';
import {NextUIProvider} from "@nextui-org/react";
import { flushAllTraces } from "next/dist/trace";
import { usePathname } from "next/navigation";
import { Children } from "react";
import {useUser} from "@clerk/nextjs";
import DashboardSidebar from "@/shared/widgets/dashboard/sidebar/dashboard.sidebar";
import { Toaster } from "react-hot-toast";
interface ProviderProps {
    children: React.ReactNode;
}

export default function Providers({children}: ProviderProps)
{
const pathname = usePathname();
const  {isLoaded} = useUser();
if (!isLoaded){
  return null;
}

return (
    <NextUIProvider>
    {pathname !== "/dashboard/new-email" &&
    pathname !== "/" &&
    pathname !== "/sign-up" &&
    pathname !== "/subscribe" &&
    pathname !== "/success" &&
    pathname !== "/sign-in" ? (
      <div className="w-full flex">
        <div className="w-[290px] h-screen overflow-y-scroll">
          <DashboardSidebar />
        </div>
        {children}
      </div>
    ) : (
      <>{children}</>
    )}
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
);


}