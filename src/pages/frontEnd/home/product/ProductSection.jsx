import { updateProductsAfterFavorite } from "../../../../features/products/productsSlice";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";

export default function ProductSection() {
    const { products } = useSelector((store) => store.products);
    const { categories } = useSelector((store) => store.categories);

    const dispatch = useDispatch();

    if (!products || !categories) {
        return <p>Loading...</p>;
    }

    const updatedProducts = products.map((item) => {
        const findCat = categories.find((d) => d.id === item.productCategory);

        return {
            ...item,
            productCategory: findCat?.categoryName || "Unknown Category",
        };
    });

    const handleFavorite = (key) => {
        const newProductsList = products.map((product) => {
            if (product.id === key) {
                return {
                    ...product,
                    isFavorite: !product.isFavorite,
                };
            }
            return product;
        });

        dispatch(updateProductsAfterFavorite(newProductsList));
    };

    return (
        <div className="py-8 bg-[#F6F9FC]" id="productSection">
            <div className="container mx-auto grid grid-cols-5 gap-4">
                {updatedProducts.map((product) => (
                    <ProductItem
                        onFavorite={handleFavorite}
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}
