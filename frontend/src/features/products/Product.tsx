import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../slices/apiSlice';
import { SiPanasonic } from 'react-icons/si';

const Product = () => {
    
  const { id } = useParams();
  const {data , isFetching, isError} = useGetProductByIdQuery(String(id));
  const navigate = useNavigate()

  const product = data;

  const modifiedProduct = {
    id : product?.id,
    name : product?.name, 
    description : product?.description, 
    images :product?.images.map((img : string) => img.split('---')[1]),
    price: product?.price,
    quantity: product?.quantity
  }

  
  return (
    <div className='h-fit min-h-[100vh] w-full '>
      <nav className='w-full h-fit bg-blue-300 p-8 '>
        <button className='h-fit w-fit p-4 rounded-lg text-white bg-black' onClick={() =>{ navigate('/home')} }> back</button>
      </nav>
      <main className='min-h-[80vh] h-fit w-full flex gap-8 p-8'>
        <div id="left" className='h-[50vh] w-2/5 border-2 border-red-700'>
          { modifiedProduct.images && <img className='h-full w-full object-cover' src={`http://localhost:3334/uploads/${modifiedProduct?.images[0]}`}></img>}
        </div>
        <div id="right" className='min-h-[50vh] h-fit w-3/5 flex flex-col gap-8 border-2  border-red-700'>
          <div className='text-[5rem] font-bold '>{modifiedProduct.name}</div>
          <div className='text-3xl '> {modifiedProduct.description}</div>
          <div className='text-3xl'> ${modifiedProduct.price}</div>
          {modifiedProduct.quantity && modifiedProduct.quantity < 0 && <span>out of stock</span>}
          <button className='h-fit text-3xl w-4/5 bg-black text-white p-2'>Purchase</button>
        </div>
      </main>
    </div>
  )
}

export default Product