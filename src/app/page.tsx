import React from 'react'
import ProductCard from '@/components/Card'
import Banner from '@/components/Banner'
import FilterPage from '@/components/Filterring'
import { products } from '../db/product'
const HomePage = () => {
  return (
    <div>
    <Banner/>
    <FilterPage/>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3'>
             
           {products.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    images={item.images} 
                    name={item.name}
                    inStock={item.inStock}
                      discountPrice={item.discountPrice}
                    price={item.price}
                  />
                ))}
          </div>
    </div>
  )
}

export default HomePage
