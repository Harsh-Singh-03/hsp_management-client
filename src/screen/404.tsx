import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <img
                    src="/404.png" // Replace with your 404 image URL
                    alt="404 Not Found"
                    style={{height: 300, objectFit: 'cover'}}
                    className="mx-auto mb-8"
                />
                <h1 className="mb-4 text-4xl font-bold text-gray-800">Page Not Found</h1>
                <p className="mb-6 text-gray-600">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}