/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import { Skeleton, Spin, message } from 'antd';
import getSingleProductDetails from '@/Api/getSingleProductDetails';
import Navbar from '../Navbar';
import getAllProducts from '@/Api/getAllProducts';
import { log } from 'console';



export default function Index(props: any) {

  const [product, setProduct] = useState([]) as any;
  const [images, setImages] = useState([]);
  const [cartData, setCartData] = useState([])
  const [productDetailsLoader, setProductDetailsLoader] = useState(true);
  useEffect(() => {
    console.log('productDetails Components', props.productId);
    // handleGetSingleProductDetails(props.productId);
    // getAllProducts();
    handleGetAllProducts();
  }, []);
  const [products, setProducts] = useState([]) as any;
  const [allProductsLoader, setAllProductsLoader] = useState(true);
  const handleGetAllProducts = async () => {
    // const Pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    try {
      setAllProductsLoader(true);
      const allProducts = await getAllProducts();
      // const allProductsArr= Object.keys(allProducts?.data);
      setProducts(allProducts.data);
      // console.log(allProducts.data);

      const singleProduct = await allProducts?.data.filter((ele: any) => {
        return ele?.id == props.productId;
        // console.log(ele?.id)
      });
      // setTotalItems(products.totalItems);
      console.log(singleProduct);
      setProduct(singleProduct);
      const image = await singleProduct[0]?.images;
      setImages(image);
      // console.log(image);

      setAllProductsLoader(false);
    } catch (error) {
      message.error("Can't load products");
      setAllProductsLoader(false);
    }
  };

  // const handleAddToCart = async (e:any) => {
  //   e.preventDefault();
  //   try {
  //     const user=await localStorage.getItem("userInfo");
  //     //@ts-ignore
  //     // JSON.parse(user)
  //     //@ts-ignore
  //     // console.log("1111",user[user?.length-3]);
  //     //@ts-ignore
  //     const data={...product,quantity:1,user:user[user?.length-3]}
  //     //@ts-ignore
  //     setCartData(prevData:any => [...prevData, data]);
  //     localStorage.setItem("cartItem",JSON.stringify(cartData));
  //     // const response=await axios.post("https://pallab99.github.io/data/cart.json",data)

  //     // console.log("111",response.data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  console.log("111",cartData);
  
  return (
    <>
      <Navbar />

      {allProductsLoader ? (
        <Skeleton active />
      ) : (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {product.breadcrumbs &&
                  product.breadcrumbs.map((breadcrumb: any) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <a
                          href={breadcrumb.href}
                          className="mr-2 text-sm font-medium text-gray-900"
                        >
                          {breadcrumb.name}
                        </a>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                <li className="text-sm flex">
                  <p className="text-3xl mr-1">Product Name : </p>
                  <div
                    // href={product.href}

                    aria-current="page"
                    className="text-3xl text-gray-500 hover:text-gray-600"
                  >
                    {product[0].title.toUpperCase()}
                  </div>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={images[0]}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={images[1]}
                    alt={product?.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={images[2]}
                    alt={product?.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={images[3]}
                  alt={product?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="text-2xl">Product information</h2>
                <p className='text-2xl tracking-tight'>Category : {product[0].category}</p>
                <p className='text-2xl tracking-tight'>Brand : {product[0].brand}</p>
                <p className="text-2xl tracking-tight text-gray-500 line-through">
                  Price: ${product[0].price}
                </p>
                <p className="text-2xl tracking-tight">
                  Discounted Price : $
                  {Math.round(
                    product[0]?.price *
                      (1 - product[0]?.discountPercentage / 100)
                  )}
                </p>

                <form className="mt-10">
                  {/* Colors */}

                    {/* <button
                      // onClick={handleAddToCart}
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to cart
                    </button> */}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-medium text-gray-900 ">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-lg text-gray-600">
                      {product[0]?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
