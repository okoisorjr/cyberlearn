import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../auth';

const SpecialRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext)

    return(
        <>
            <Route {...rest} render={props => {
                    return user.role === "lecturer" && <Component {...props}/>
                }}
            />
            <Route {...rest} render={props => {
                    return user.role === 'student' && <Redirect to = '/Dashboard'/>
                }}
            />
        </>
    )
}

export default SpecialRoute;