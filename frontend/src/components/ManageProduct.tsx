import { Dispatch, SetStateAction } from "react";
import { useGetAdminProductsQuery } from "../slices/apiSlice";
import Dropdown from "./Dropdown";

const ManageProduct = ( {setToggle } : {setToggle : () => void} ) => {
  const {
    data: products = [],
    isSuccess,
    isError,
    error,
  } = useGetAdminProductsQuery();

  return (
    <main
      id="manage Products"
      className="h-full w-full flex flex-col items-center p-8"
    >
      <button className="rounded-xl p-3 bg-blue-400 hover:bg-violet-800 hover:text-white"
        onClick={setToggle}
      >
        {" "}
        Add New Product{" "}

      </button>
      <table className="relative h-full w-full ">
        <tr className="border-b-2 border-gray-200">
          <th className="text-left p-4">S.No.</th>
          <th className="text-left p-4">Name</th>
          <th className="text-left p-4">Description</th>
          <th className="text-left p-4">Price</th>
          <th className="text-left p-4">Quantity</th>
        </tr>
        {isSuccess && products ? (
          products?.map((product, idx) => {
            return (
              <tr className=" border-gray-200 border-b-2  " key={product.id}>
                <td className="p-4 ">{idx}</td>
                <td className="p-4 ">{product.name}</td>
                <td className="p-4 ">
                  {product.description?.substring(0, 60)}...
                </td>
                <td className="p-4 ">{product.price}</td>
                <td className="p-4 ">{product.quantity}</td>
                <td>
                  {" "}
                  {
                    <Dropdown items={["Edit", "Delete", "Not Available"]} />
                  }{" "}
                </td>
              </tr>
            );
          })
        ) : (
          <h3>
            {isError && `something went wrong while fetching products ${error}`}
          </h3>
        )}
      </table>
    </main>
  );
};

export default ManageProduct;
