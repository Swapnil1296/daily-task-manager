
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navigation/NavBar';

const PrivateRoute = () => {
    const accessToken = sessionStorage.getItem('accessToken');

    // Check if the user is authenticated
    if (!accessToken) {
        return <Navigate to="/log-in" replace />;
    }

    return <>
        <Navbar />

        <Outlet />

    </>;
};

export default PrivateRoute;
