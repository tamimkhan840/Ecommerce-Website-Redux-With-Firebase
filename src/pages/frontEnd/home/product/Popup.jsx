export default function Popup({ product, onClose, onFavorite }) {
    const {
        productImageUrl,
        productCategory,
        productName,
        productPrice,
        isFavorite,
    } = product;

    return (
        <div className="w-full h-screen bg-black/60 fixed top-0 left-0 z-9">
            <div className="max-w-screen-md p-6 bg-white border w-full mx-auto mt-[100px] flex gap-3 items-center relative">
                <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={onClose}
                >
                    <svg
                        className="w-9 h-9 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                        />
                    </svg>
                </div>
                <div className="w-1/2">
                    <img
                        className="w-full object-cover"
                        src={productImageUrl}
                        alt={productName}
                    />
                </div>
                <div className="w-1/2">
                    <h2 className="text-3xl font-semibold">{productName}</h2>
                    <span className="text-red-600 text-sm">
                        {productCategory}
                    </span>
                    <p className="mt-3">Price: {productPrice}</p>

                    <div className="flex mt-2">
                        {!isFavorite ? (
                            <svg
                                onClick={() => onFavorite()}
                                className="cursor-pointer w-6 h-6 text-red-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                            </svg>
                        ) : (
                            <svg
                                onClick={() => onFavorite()}
                                className="cursor-pointer w-6 h-6 text-red-600 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                            </svg>
                        )}
                        <svg
                            className="w-8 h-8 text-red-600 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h14m-7 7V5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
