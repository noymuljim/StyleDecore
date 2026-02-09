import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import LandingPage from "../pages/Home/Landingpage/LandingPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddService from "../pages/Dashboard/AddService/AddService";
import serviceDetails from "../pages/Home/Home/Services/ServiceDetails/serviceDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: LandingPage,
                loader: () => fetch('/servicecenters.json').then(res => res.json())
            },
            {
                path:'service-details/:id',
                Component:serviceDetails
            }
            
        ]
    },

    
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
        path: 'add-service',
        Component: AddService
    },
        ]
    }

]);