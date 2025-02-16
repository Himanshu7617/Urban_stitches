import { useEffect, useState, useRef } from "react";
import { z, ZodFormattedError } from "zod";
import { RxCross1 } from "react-icons/rx";
import { useAddNewProductMutation } from "../slices/apiSlice";
import { NewProduct } from "../slices/productSlice";

const ProductData = z.object({
  name: z.string().min(2, "Name must be greater than two characters"),
  description: z
    .string()
    .min(5, "Description must be greater than 5 characters"),
  price: z.number().positive("Price must be greater than 1"),
  quantity: z.number().positive("Quantity must be greater than 1"),
});

type ProductType = z.infer<typeof ProductData>;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

  const [errors, setErrors] = useState<
    ZodFormattedError<ProductType> | undefined
  >(undefined);

  function handleImageDeletion(idx: number) {
    const newImages = images.filter((_, i) => i !== idx);
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== idx));

    if (newImages.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handlefileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
    const files = Array.from(e.target.files);

    try {
      const urls = await Promise.all(
        files.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = () => reject("File reading failed");
              reader.readAsDataURL(file);
            })
        )
      );

      setImagePreviewUrls((prev) => [...prev, ...urls]);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submittedData = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    };

    const validationResult = ProductData.safeParse(submittedData);
    const formattedErrors = validationResult.error
      ? validationResult.error.format()
      : undefined;

    if (formattedErrors) {
      setErrors(formattedErrors);
      return;
    } else {
      const formData = new FormData();
      formData.append("name", submittedData.name);
      formData.append("description", submittedData.description);
      formData.append("quantity", submittedData.quantity.toString());
      formData.append("price", submittedData.price.toString());

      // Append each image file
      images.forEach((image) => {
        formData.append("images", image);
      });

      try {
        const result = await addNewProduct(formData as unknown as NewProduct).unwrap();
        if(result){
        alert("product added successfully");
        }
        setName("");
        setPrice(0);
        setQuantity(0);
        setDescription("");
        setImages([]);
        setImagePreviewUrls([]);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
        encType="mulitpart/form-data"
        className="h-full w-2/5 text-xl  p-4 grid grid-rows-5 grid-cols-[0.7fr_2fr] items-center gap-4 "
      >
        <label htmlFor="name"> Name : </label>
        <div>
          <input
            className=" w-full border-black outline-none p-2 border-b-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            name="name"
            autoFocus
          />
          {errors && (
            <span className="text-red-600">{errors.name?._errors[0]}</span>
          )}
        </div>
        <label htmlFor="description"> Description : </label>
        <div>
          <input
            className=" w-full border-black outline-none p-2 border-b-2"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            name="description"
          />
          {errors && (
            <span className="text-red-600">
              {errors.description?._errors[0]}
            </span>
          )}
        </div>

        <label htmlFor="price"> Price : </label>
        <div>
          <input
            className=" w-full border-black outline-none p-2 border-b-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            type="number"
            name="price"
          />
          {errors && (
            <span className="text-red-600">{errors.price?._errors[0]}</span>
          )}
        </div>

        <label htmlFor="quantity"> Quantity : </label>
        <div>
          <input
            className=" w-full border-black outline-none p-2 border-b-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
            type="number"
            name="quantity"
          />
          {errors && (
            <span className="text-red-600">{errors.quantity?._errors[0]}</span>
          )}
        </div>

        <label htmlFor="images"> Images : </label>
        <div>
          {imagePreviewUrls.length < 3 && (
            <input
              onChange={(e) => {
                handlefileChange(e);
              }}
              type="file"
              name="images"
              accept="image/*"
              ref={fileInputRef}
              multiple
            />
          )}
          <div>
            <ul className="flex gap-2">
              {imagePreviewUrls.map((url, idx) => (
                <li className="relative" key={idx}>
                  {" "}
                  <img src={url} className="w-20 h-20"></img>
                  <span
                    onClick={() => {
                      handleImageDeletion(idx);
                    }}
                    className="text-[0.5rem] absolute top-1 bg-white right-1 rounded-full border-2 border-red-600 p-1 text-red-600 hover:text-white hover:bg-red-600 hover:cursor-pointer"
                  >
                    <RxCross1 />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="w-full h-fit p-2 text-2xl col-span-2 hover:bg-emerald-700 hover:text-white bg-emerald-400 rounded-lg"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
