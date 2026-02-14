import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../shared/Forbidden";


const DecoratorRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <div>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    if (role !== 'rider') {
        return <Forbidden></Forbidden>
    }
    return children;
};


export default DecoratorRoute;