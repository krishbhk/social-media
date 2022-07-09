import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props){
    let userId = localStorage.getItem('psnUserId');

    if(userId!=null)
        return props.children;
    else
        return (<Navigate to='/login' replace/>)
}