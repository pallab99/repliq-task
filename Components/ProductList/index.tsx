/* eslint-disable @next/next/no-img-element */
'use client';
import { StarIcon } from '@heroicons/react/20/solid';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import getAllProducts from '@/Api/getAllProducts';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const [products, setProducts] = useState([]) as any;
  const [allProductsLoader, setAllProductsLoader] = useState(true);

  const handleGetAllProducts = async () => {
    try {
      setAllProductsLoader(true);
      const products = await getAllProducts();
      setProducts(products.data);
      setAllProductsLoader(false);
    } catch (error) {
      message.error("Can't load products");
      setAllProductsLoader(false);
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        {allProductsLoader ? (
          <Spin size="large" className="flex justify-center py-10" />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product: any) => (
              <div
                key={product.id}
                className="group relative rounded-sm cursor-pointer"
                onClick={() => {
                  router.push(`/productDetails/${product.id}`);
                }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product?.thumbnail}
                    alt={product?.thumbnail}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product?.title}
                      </div>
                    </h3>
                    <div className="flex justify-start items-center gap-2 mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6" />
                      {product?.rating}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product?.price * (1 - product?.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm font-medium text-gray-500 line-through">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
