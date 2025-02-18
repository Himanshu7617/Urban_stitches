import { SignOutButton, useUser } from '@clerk/clerk-react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetAdminProductsQuery } from '../../slices/apiSlice';

const Home = () => {
    const {user} = useUser();

    const { data : products = [] } = useGetAdminProductsQuery();
    

    const modifiedProducts = products.map((product ) => {
      const images = product.images.map((img) => img.split("---")[1])
      return { 
        ...product, 
        images : images
      }
    })

    const navigate = useNavigate();

    useEffect(()=> {
          if(user?.publicMetadata.role === "ADMIN") {
            console.log(user);
            navigate('/adminPortal');
        }
        console.log(user?.publicMetadata.role);
        },[]);
        useEffect(() => {
          console.log(modifiedProducts)
        },[modifiedProducts])

  return (
    <div>
      <nav className= "h-fit p-8 w-full bg-blue-300">
        <button className='h-fit w-fit bg-black text-white p-4 rounded-xl'><SignOutButton/></button>
      </nav>

      <main className='min-h-[100vh] p-8 h-fit w-full'> 
        <div className='h-[80vh] w-full border-2 border-blue-950 p-4'>
          {modifiedProducts && modifiedProducts.length> 0 && <div>
            {modifiedProducts.map((item, idx) => {
              return <div key={idx} className='rounded-lg h-40 w-40'>
                <img src={`http://localhost:3334/uploads/${item.images[0]}`} className=' rounded-lg h-30 w-40 '></img>
                <button onClick={() => { navigate(`/product/${item.id}`)}} className='w-full h-fit p-2 bg-black rounded-b-lg  text-white hover:bg-gray-600'>buy</button>
              </div>
            })}
            </div>}
        </div>
      </main>
    </div>
  )
}

export default Home