import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router";
import Avatar from "react-avatar";
import { logOutUser } from "../database/firebaseAuth";
import { toast } from "react-toastify";

export default function DashboardLayout() {
    const authUser = useSelector((store) => store.auth);
    const navigate = useNavigate()


    const handleLogout = async () => {
        const res = await logOutUser();

        if (res.error) {
            toast.error(res.message);
        } else {
            toast.success("Logged out successfully!");
            navigate("/login");
        }
    };

    return (
        <>
            <header className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link
                        to="/dashboard"
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                        Home
                    </Link>

                    <div className="space-x-4">
                        <Link
                            to="create-product"
                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                        >
                            Create new Product
                        </Link>
                        <Link
                            to="create-category"
                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                        >
                            Create new Category
                        </Link>
                        <button onClick={handleLogout} className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <h1 className="text-4xl py-5 text-center">
                <Avatar name={authUser.user.name} round={true} />
                {authUser.user.name}
            </h1>
            <div className="py-5">
                <Outlet />
            </div>
        </>
    );
}
