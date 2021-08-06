import React, {useContext } from 'react';
import { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../auth';

const AdminRoute = ({component: Component, ...rest}) => {
    const {currentUser, user} = useContext(AuthContext)

    return(
        <Fragment>
            <Route {...rest} render={props => {
                        return user.role === 'admin' && <Component {...props}/>            
                    }}
                />
                
                <Route {...rest} render={props => {
                        return currentUser === null && <Redirect to = '/AdminLogin' />            
                    }}
                />
        </Fragment>
    )
}

export default AdminRoute;