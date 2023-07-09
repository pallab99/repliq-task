'use client';
import Navbar from '@/Components/Navbar';
import ProductList from '@/Components/ProductList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <ProductList />
    </div>
  );
}
