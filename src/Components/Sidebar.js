import React from 'react';
import { FaBlogger, FaBook, FaLaptop, FaVideo } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import icon from '../assets/Asset 4.png';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const nav = [
        {title:'Dashboard', icon:<AiFillDashboard/>, path:'/Dashboard', cName:'dashboard'},
        {title:'Courses', icon:<FaBook/>, path:'/AddCourse', cName:'course'},
        {title:'Class', icon:<FaVideo/>, path:'/vClass', cName:'class'},
        {title:'Blog', icon:<FaBlogger/>, path:'/Blogs', cName:'blog'},
        {title:'Lab', icon:<FaLaptop/>, path:'/lab', cName:'lab'},
    ]
    return (
        <>
            <div className="sidebar">
                <div className="logo">
                    <a href="/"><img src={icon} alt="Logo"/></a>
                </div>
                <div>
                    <ul className="navbar">
                        {nav.map(items => ( 
                            <li key={items.cName} className="nav-item">
                                <Link to={items.path} className="nav-link">{items.icon}<span>{items.title}</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
