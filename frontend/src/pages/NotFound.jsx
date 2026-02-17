import { Link } from "react-router";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const NotFound = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center overflow-hidden justify-center z-1">
            <h1 className="absolute w-full h-full text-[50vw] lg:text-[60vh] -z-1 text-center bg-background-light font-extrabold text-red-500/10">404</h1>
            <div className=" rounded-lg backdrop-blur-lg text-shadow-2xl h-fit text-white bg-white/5 max-w-160 shadow-2xl text-center mx-4 md:mx-0 w-full py-10 px-6 flex flex-col justify-center items-center">
                <IoWarningOutline size={64} className="bg-red-500/20 text-white p-4 rounded-xl" />
                <p className="text-4xl md:text-6xl font-bold mt-4">Page Not Found</p>
                <p className="mt-2 text-md md:text-2xl text-center">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="mt-6 flex gap-1 items-center px-6 py-3 text-xl rounded-lg font-semibold bg-primary text-white"
                >
                    <IoIosArrowBack />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
