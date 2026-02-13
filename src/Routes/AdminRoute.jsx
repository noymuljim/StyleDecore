import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../shared/Forbidden';

const AdminRoute = ({children}) => {
    const{loading}=useAuth()
        const{role,roleLoading}=useRole()
          if(loading ||roleLoading){
        return <div>
            <span className="loading loading-ring loading-lg"></span>
			        </div>
    }

    if(role!== 'admin'){
    return <Forbidden></Forbidden>
}

 return children;
};

export default AdminRoute;