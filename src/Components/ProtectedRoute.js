import React, {useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext)

    return(
        <Route {...rest} render={props => {
                return currentUser === null ? <Component {...props}/>
                : <Redirect to='/Dashboard'/>                
            }}
        />
    )
}

export default ProtectedRoute;