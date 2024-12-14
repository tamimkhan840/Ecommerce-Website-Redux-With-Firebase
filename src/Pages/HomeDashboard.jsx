
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategories, getCategories } from '../features/categories/CategorySlice';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { onRemoveFromFirebase } from '../database/firebaseUtils';

export default function HomeDashboard() {
    const dispatch = useDispatch()
    const categoriesData = useSelector((state) => state.categories)
    const [deleteCategoryId, setDeleteCategoryId] = useState(false)

    useEffect(() =>{
        dispatch(getCategories())
    },[dispatch])


    const products = [
        {
            id: 1,
            name: "Black Male T-Shirt",
            price: 20.0,
            image: "https://via.placeholder.com/150",
            rating: 4,
        },
        {
            id: 2,
            name: "Black Male T-Shirt",
            price: 20.0,
            image: "https://via.placeholder.com/150",
            rating: 4,
        },
        {
            id: 3,
            name: "Black Male T-Shirt",
            price: 20.0,
            image: "https://via.placeholder.com/150",
            rating: 4,
        },
        {
            id: 4,
            name: "Black Male T-Shirt",
            price: 20.0,
            image: "https://via.placeholder.com/150",
            rating: 4,
        },
        {
            id: 5,
            name: "Black Male T-Shirt",
            price: 20.0,
            image: "https://via.placeholder.com/150",
            rating: 4,
        },
        {
            id: 6,
            name: "Black Male T-Shirt",
            price: 20.0,
            image: "https://via.placeholder.com/150",
            rating: 4,
        },
    ];

    const handleCategoryId= (id) => {
        setDeleteCategoryId(id)
    }
    const handleDeleteCategoryId= ()=>{
        setDeleteCategoryId(false)
    }
    const onHandleDelete =() => {
        if (deleteCategoryId) {

            // onRemoveFromFirebase("categories/" + deleteCategoryId)
            dispatch(deleteCategories(deleteCategoryId))
        }
        setDeleteCategoryId(false)

    }

    let categoriesSectionContent;

    if (categoriesData.isLoading) {
        categoriesSectionContent = (
            <div className="text-xl">Data is loading ...</div>
        );
    }

    if (!categoriesData.isLoading && categoriesData.isError) {
        categoriesSectionContent = (
            <div className="text-xl">Error || {categoriesData.error}</div>
        );
    }
    if (
        !categoriesData.isLoading &&
        !categoriesData.isError &&
        categoriesData.categories.length === 0
    ) {
        categoriesSectionContent = (
            <div className="text-xl">No category found</div>
        );
    }
    if (
        !categoriesData.isLoading &&
        !categoriesData.isError &&
        categoriesData.categories.length > 0
    )
    {
        categoriesSectionContent = categoriesData.categories.map((category) => (
            <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full"
            >
                <img
                    src={category.categoryImageUrl}
                    alt={category.categoryName}
                    className="w-24 h-24 object-cover mb-3"
                />
                <p className="text-lg font-semibold">{category.categoryName}</p>
                <div className="flex justify-between mt-4">
                    <Link
                        to={`/edit-category/${category.id}`}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Edit
                    </Link>
                    <button onClick={() => handleCategoryId(category.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                        Delete
                    </button>
                </div>
            </div>
        ));
    }
    return (
        <div>
            {   deleteCategoryId &&
                <Modal onDeleteCategoryId={handleDeleteCategoryId} onHandleDelete={onHandleDelete}/>
            }
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Categories
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categoriesSectionContent}
                    </div>
                </div>
            </section>

            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {product.name}
                                    </h3>
                                    <p className="text-red-500 font-bold">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        {Array.from({ length: 5 }).map(
                                            (_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-5 h-5 ${
                                                        index < product.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.208a1 1 0 00.95.69h4.42c.969 0 1.371 1.24.588 1.81l-3.584 2.597a1 1 0 00-.364 1.118l1.357 4.208c.3.921-.755 1.688-1.539 1.118l-3.584-2.597a1 1 0 00-1.176 0L5.98 17.688c-.784.57-1.838-.197-1.539-1.118l1.357-4.208a1 1 0 00-.364-1.118L1.85 9.635c-.783-.57-.381-1.81.588-1.81h4.42a1 1 0 00.95-.69l1.357-4.208z" />
                                                </svg>
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                            Edit
                                        </button>
                                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}