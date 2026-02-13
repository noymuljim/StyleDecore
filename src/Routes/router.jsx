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
import myBookings from "../pages/Dashboard/MyBookings/myBookings";
// import Payment from "../pages/Dashboard/Payment/payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import Decorator from "../pages/Decorator/Decorator";
import ApproveDecorators from "../pages/Dashboard/ApproveDecorators/ApproveDecorators";
import UsersManagement from "../pages/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignDecorators from "../pages/AssignDecorators/AssignDecorators";

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
                path: 'service-details/:id',
                Component: serviceDetails,
                loader: () => fetch('/servicecenters.json').then(res => res.json())

            },
            {
                path: 'decorator',
                element: <PrivateRoute><Decorator></Decorator></PrivateRoute>,
                loader: () => fetch('/servicecenters.json').then(res => res.json())

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
                path: 'my-bookings',
                Component: myBookings
            },
            // {
            //     path: 'payment/:id',
            //     Component: Payment
            // },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
              {
                path: 'add-service',
               // Component: AddService
               element:<AdminRoute><AddService></AddService></AdminRoute>
            },
            {
                path: 'approve-decorators',
               // Component: ApproveDecorators
               element:<AdminRoute><ApproveDecorators></ApproveDecorators></AdminRoute>
            },
            {
                path: 'users-management',
                //  Component: UsersManagement
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            },
            {
                path: 'assign-decorator',
                element: <AdminRoute><AssignDecorators></AssignDecorators></AdminRoute>
            },
        ]
    }

]);