import React, {useContext } from 'react';
import { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../auth';

const AdminProtectedRoute = ({component: Component, ...rest}) => {
    const {currentUser, user} = useContext(AuthContext)

    return(
        <Fragment>
            <Route {...rest} render={props => {
                        return user.role === 'admin' && <Redirect to = '/Admin' />            
                    }}
                />
                
                <Route {...rest} render={props => {
                        return currentUser === null && <Component {...props}/>            
                    }}
                />
        </Fragment>
    )
}

export default AdminProtectedRoute;