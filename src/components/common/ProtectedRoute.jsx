import {PATH} from '../../constansts';
import { Navigate } from 'react-router-dom';
import {  useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    
const { authedUser } = useSelector((state) => state.authentication);

  if (authedUser) {
    return <>{children}</>;
  } else return <Navigate replace to={PATH.LOGIN} />;
};

export default ProtectedRoute;
