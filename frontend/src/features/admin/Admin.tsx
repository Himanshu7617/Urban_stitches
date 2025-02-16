import React, { useEffect, useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
// import { useGetAdminProductsQuery } from "../../slices/apiSlice";
import { RxCross1 } from "react-icons/rx";
// import Dropdown from "../../components/Dropdown";
import AddProduct from "../../components/AddProduct";
import ManageProduct from "../../components/ManageProduct";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [toggle, setToggle] = useState(0);

  // const { data : products = [],isSuccess, isError, error } = useGetAdminProductsQuery()

  const [navActive, setNavActive] = useState(false);

  // if you are not ADMIN, sir go to home coz you ain't authorized
  useEffect(() => {
    if (user?.publicMetadata.role !== "ADMIN") {
      console.log(user);
      navigate("/home");
    }
  }, []);

  function toggleToAddProduct() {
    setToggle(1);
  }

  return (
    <div className="overflow-x-hidden h-fit">
      <header className="h-[8vh] md:h-[12vh] lg:h-[14vh] w-full bg-blue-400 flex items-center justify-between p-4">
        <h1
          onClick={() => {
            navigate("/adminPortal");
          }}
          className="text-[1rem] md:text-xl lg:text-3xl font-bold cursor-pointer"
        >
          UrbanStitches
        </h1>
        <nav
          onClick={() => {
            setNavActive(!navActive);
          }}
          id="SmallDevices"
          className=" block md:hidden"
        >
          {navActive ? <RxCross1 /> : <CiMenuFries />}
        </nav>

        <nav id="mediumDevices LargeDevices" className=" hidden md:block">
          <ul className="text-xl  flex gap-4">
            <li className="underline hover:text-purple-800 hover:cursor-pointer">
              Dashboard
            </li>
            <li
              className="underline hover:text-purple-800 hover:cursor-pointer"
              onClick={() => {
                setToggle(1);
              }}
            >
              Add Product
            </li>
            <li
              className="underline hover:text-purple-800 hover:cursor-pointer"
              onClick={() => {
                setToggle(2);
              }}
            >
              Manage Products
            </li>
            <li
              className="underline hover:text-purple-800 hover:cursor-pointer"
              onClick={() => {
                setToggle(3);
              }}
            >
              Profile
            </li>
          </ul>
        </nav>
      </header>
      {navActive && (
        <nav
          id="smallDevices"
          className={`absolute  h-full w-full bg-blue-400 flex flex-col items-center justify-center gap-4 `}
        >
          <ul className="text-xl  flex flex-col items-center justify-cente gap-8">
            <li className="hover:underline hover:text-purple-800 hover:cursor-pointer">
              Dashboard
            </li>
            <li className="hover:underline hover:text-purple-800 hover:cursor-pointer">
              Add Product
            </li>
            <li className="hover:underline hover:text-purple-800 hover:cursor-pointer">
              Manage Products
            </li>
            <li className="hover:underline hover:text-purple-800 hover:cursor-pointer">
              Profile
            </li>
          </ul>
        </nav>
      )}

      {/* <main id="manage Products" className="h-fit min-h-[86vh] flex flex-col items-center p-8">

        <button className="rounded-xl p-3 bg-blue-400 hover:bg-violet-800 hover:text-white"> Add New Product </button>
        <table className="relative h-full w-full ">
          <tr className="border-b-2 border-gray-200">
            <th className="text-left p-4">S.No.</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Quantity</th>
          </tr>
          {isSuccess &&  products ? products?.map((product, idx ) => {
            return (
              <tr className=" border-gray-200 border-b-2  " key={product.id}>
                <td className="p-4 ">{idx}</td>
                <td className="p-4 ">{product.name}</td>
                <td className="p-4 ">{product.description?.substring(0,60)}...</td>
                <td className="p-4 ">{product.price}</td>
                <td className="p-4 ">{product.quantity}</td>
                <td> {<Dropdown items ={["Edit","Delete","Not Available"]}/>} </td>
              </tr>
            )
          })
          : 
          <h3>{isError && `something went wrong while fetching products ${error}`}</h3>
          }
        </table>
      </main> */}

      {toggle === 1 && (
        <main id="add Products" className=" h-[86vh] w-full">
          <AddProduct />
        </main>
      )}
      {toggle === 2 && (
        <main
          id="manage Products Products"
          className=" h-fit min-h-[86vh] w-full"
        >
          <ManageProduct setToggle={toggleToAddProduct} />
        </main>
      )}

      {toggle === 3 && (
        <main id="profile Products" className="h-[86vh] w-full">
          <button className="h-fit w-fit p-4 bg-black text-white hover:bg-gray-700">
            <SignOutButton />
          </button>
        </main>
      )}
    </div>
  );
};

export default Admin;
