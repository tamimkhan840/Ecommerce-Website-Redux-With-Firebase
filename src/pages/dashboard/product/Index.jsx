import { useSelector } from "react-redux";
import Table from "../../../component/Table";
import { useNavigate } from "react-router-dom"; // Corrected import

export default function IndexProduct() {
    const { products } = useSelector((store) => store.products);
    const { categories } = useSelector((store) => store.categories);
    const navigate = useNavigate();

    // Check if products or categories are undefined or empty
    if (!products || !categories) {
        return <p>Loading...</p>;
    }

    // Map through products and find the category name
    const updatedProducts = products.map((item) => {
        let findCat = categories.find((d) => d.id === item.productCategory);

        return {
            ...item,
            productCategory: findCat ? findCat.categoryName : "Unknown Category", // Handle undefined case
        };
    });

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">Our Products</h1>
            <Table
                tableContent={updatedProducts}
                onAdd={() => navigate("/dashboard/create-product")}
                onEdit={(data) =>
                    navigate(`/dashboard/edit-product/${data.id}`)
                }
            />
        </>
    );
}
