/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter,usePathname } from 'next/navigation';
import Form from "../../Components/Checkout/Form";
import Products_Added_To_The_Cart from "../../Components/Checkout/Products"
import Navbar from '@/Components/Navbar';



export default function Page() {
  return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <Form/>
          <div className="lg:col-span-2">
           <Products_Added_To_The_Cart />
          </div>
        </div>
      </div>
  );
}
