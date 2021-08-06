import React, {useContext} from 'react';
import {AuthContext} from '../auth'
import StudentView from '../students/StudentView'
import StaffView from '../instructor/StaffView'
import Header from '../Components/header';
//import AdminDashboard from '../admin/AdminDashboard';

export const Dashboard = () => {

    const {user} = useContext(AuthContext)

    return(
        <>
            <Header/>
            {user.role === "student" && <StudentView/>}
            {user.role === "lecturer" && <StaffView/>}            
        </>
    )

}
        
export default Dashboard;