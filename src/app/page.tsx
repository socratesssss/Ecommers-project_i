import React from 'react'
import ProductCard from '@/components/Card'
import Banner from '@/components/Banner'
import FilterPage from '@/components/Filterring'
const HomePage = () => {
  return (
    <div>
    <Banner/>
    <FilterPage/>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 mx-auto px-4 md:px-6 py-10 container gap-3'>
             
           <ProductCard 
             image="https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp"
              name="Vape Pro 3000"
              price="39.99"
              />
           <ProductCard 
             image="https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp"
              name="Vape Pro 3000"
              price="39.99"
              />
           <ProductCard 
             image="https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp"
              name="Vape Pro 3000"
              price="39.99"
              />
           <ProductCard 
             image="https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp"
              name="Vape Pro 3000"
              price="39.99"
              />
           <ProductCard 
             image="https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp"
              name="Vape Pro 3000"
              price="39.99"
              />
           <ProductCard 
             image="https://www.vaporzonebd.com/admin_assats/product/d103f16a8bc88e82bfee1e3819e47b8a.vaporesso-xros-5-mini-pod-system.webp"
              name="Vape Pro 3000"
              price="39.99"
              />
          </div>
    </div>
  )
}

export default HomePage
