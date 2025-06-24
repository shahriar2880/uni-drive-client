import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import MyBookings from "../pages/MyBookings";
import ResetPassword from "../pages/ResetPassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "available-cars",
                element: <AvailableCars />
            },
            {
                path: "cars/:id",
                element: <CarDetails />,
                loader: ({params}) => fetch(`https://neo-drive-server.vercel.app/cars/${params.id}`)
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "forget-password",
                element: <ResetPassword />
            },
            {
                path: "add-car",
                element: (
                    <PrivateRoute>
                        <AddCar />
                    </PrivateRoute>
                )
            },
            {
                path: "my-cars",
                element: (
                    <PrivateRoute>
                        <MyCars />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-bookings",
                element: (
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                )
            },
        ]
    }
]);


export default router;