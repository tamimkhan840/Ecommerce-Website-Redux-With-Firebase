import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


// import app from "../database/firebaseConfig";
import { categoryFormSchema } from "../validation/validationSchema";
import {  getFromData, getFromFireBaseData, updateDataFromFirebase } from "../database/firebaseUtils";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";


export default function CreateCategory() {
    const navigate = useNavigate()
    const params = useParams()
    

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(categoryFormSchema),
      defaultValues:{
        categoryName: "",
        categoryImageUrl: ""
      }
    })
    useEffect(()=> {
        async function getDataFromDataBase() {
            let res = await getFromFireBaseData("categories/" + params.id)
            reset(res)
        }
        if (params.id) {
            getDataFromDataBase()
        }
        else{
            reset({
                 categoryName: "",
              categoryImageUrl: ""
            })

        }
    },[params, reset])
    const onSubmit = (data) => {
        if (params.id) {
            updateDataFromFirebase(`categories/${params.id}`, data);
            toast.success("Update is successful")
        } else {
            getFromData("categories", data);
            toast.success("Creation is successful")
        }
        navigate(-1)
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">{params.id ?"Edit Product" :"Add Product"}</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Product Name */}
                <div>
                    <label
                        htmlFor="categoryName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Category Name
                    </label>
                    <input
                        {...register("categoryName")}
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product name"
                    />
                    {errors.categoryName && (
                        <span className="text-red-400">
                            {errors.categoryName?.message}
                        </span>
                    )}
                </div>

                {/* Product Image URL */}
                <div>
                    <label
                        htmlFor="categoryImageUrl"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Category Image URL
                    </label>
                    <input
                        {...register("categoryImageUrl")}
                        type="url"
                        id="categoryImageUrl"
                        name="categoryImageUrl"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product image URL"
                    />

                    {errors.categoryImageUrl && (
                        <span className="text-red-400">
                            {errors.categoryImageUrl?.message}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <button

                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                   {params.id ? "Update Product":"Submit"}
                </button>
            </form>
        </div>
    );
}