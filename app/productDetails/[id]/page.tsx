'use client';
import Product_Details from '@/Components/Product-Details';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Product_Details productId={params.id} />
    </>
  );
}
