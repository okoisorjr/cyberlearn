import React, {useContext } from 'react';
import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser, user} = useContext(AuthContext)

    return(
        <Fragment>
            <Route {...rest} render={props => {
                return currentUser && user.role !== 'admin' ? <Component {...props}/>
                    : <Redirect to='/Login'/>             
                }}
            />

            <Route {...rest} render={props => {
                    return user.role === 'admin' && <Redirect to ='/Admin'/>
                }}
            />
        </Fragment>
    )
}

export default PrivateRoute;