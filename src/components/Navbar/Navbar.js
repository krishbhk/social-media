import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import {AiOutlineSearch,AiFillHome} from 'react-icons/ai';
import {FaUserCircle} from 'react-icons/fa';
import {MdLogout} from 'react-icons/md';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { useState } from 'react';

export default function Navbar(props){
    // const [searchData,setSearchData] = useState(null);
    
    const navigate = useNavigate();
    let token = localStorage.getItem("psnToken");
    
    function handleSearch(event){
        if(event.key === 'Enter'){
            // submit
            event.preventDefault();
            // event.target.elements.formFirstName.innerHTML = "HAHA";
            // console.log();
            let user = {
                firstName: event.target.value,
            }

            // const response = await axios({
            //     method: "post",
            //     url: "/api/v1/users/getallfirstname",
            //     headers: {
            //     Authorization: localStorage.getItem("psnToken"),
            //     },
            //     data: {
            //         "firstName": user.firstName,
            //     }
            // });
            // setSearchData(response.data.payload);   

            // console.log(searchData);
            // return response.data;
            navigate('/newsfeed/search',{state: user.firstName},  { replace: true });
        }
    };

    // async function handleSearch(event) {
    //     event.preventDefault();
    //     // event.target.elements.formFirstName.innerHTML = "HAHA";
    //     let user = {
    //         firstName: event.target.elements.formFirstName.value,
    //     }

    //     const response = await axios({
    //         method: "post",
    //         url: "/api/v1/users/getallfirstname",
    //         headers: {
    //          Authorization: localStorage.getItem("psnToken"),
    //         },
    //         data: {
    //             firstName: user.firstName,
    //         }
    //     });
        
    //     console.log(response);
    //     return response.data;
    // }

    if(token===null){
        return (
            <div className="nav-bar">
    
                <div className='nav-container flex-fill d-flex align-items-center'>
                    <div className='d-flex align-items-center'>
                        <img src={require("../assets/logo.jpg")} className="logo mx-2 position-relative" height={"60px"} ></img>
                    </div>
                </div>
                <div className='nav-container '></div>
                <div className='nav-btn-bar'>
                    <div className="nav-btn-container d-flex align-items-center">
                        {/* <button className="nav-btn" onClick={()=>{navigate('/')}}>Home</button> */}
                        <span className='mx-2 icon-container w-100'><Link to='/'><AiFillHome className='nav-btn-icon' size={22}/></Link></span>
                    </div>
                    <div className="nav-btn-container d-flex align-items-center">
                        <button className="mx-2 px-5 nav-btn my-2" onClick={()=>{navigate('/signin')}}><strong>Log In</strong></button>
                    </div>
                    <div className="nav-btn-container d-flex align-items-center">
                        <button className="mx-2 px-5 nav-btn my-2" onClick={()=>{navigate('/signup')}}><strong>Sign Up</strong></button>
                    </div>
                </div>
                
            </div>
        );
    }else{
        return (
            <div className="nav-bar">
    
                <div className='nav-container flex-fill d-flex align-items-center'>
                    <div className='d-flex align-items-center'>
                        <img src={require("../assets/logo.jpg")} className="logo mx-2 position-relative" height={"60px"} onClick={()=>{navigate('/')}}></img>
                    </div>
                    <div className='' >
                        <div className='search-box d-inline-flex mx-auto px-3 '>
                            <span className='mx-auto form-inline'><AiOutlineSearch className='search-icon' color='grey' size={22}/></span>
                            <form class="form-inline mx-auto">
                                <input class="form-control mx-auto" type="search" placeholder="Search" aria-label="Search" id='formSearch' onKeyDown={handleSearch}/>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='nav-container '></div>
                <div className='nav-btn-bar'>
                    <div className="nav-btn-container d-flex align-items-center">
                        {/* <button className="nav-btn" onClick={()=>{navigate('/')}}>Home</button> */}
                        <span className='my-2 mx-2 icon-container w-100'><Link to='/newsfeed'><AiFillHome className='nav-btn-icon' size={22}/></Link></span>
                    </div>
                    <div className="nav-btn-container d-flex align-items-center">
                        {/* <button className="nav-btn" onClick={()=>{navigate('/')}}>Home</button> */}
                        <span className='mx-2 icon-container w-100'><Link to='/myprofile'><FaUserCircle className='nav-btn-icon' size={22}/></Link></span>
                    </div>
                    <div className="nav-btn-container d-flex align-items-center">
                        {/* <button className="nav-btn" onClick={()=>{navigate('/')}}>Home</button> */}
                        <span className='mx-2 icon-container w-100' onClick={()=>{localStorage.clear(); window.location.reload();}}><Link to='/'><MdLogout className='nav-btn-icon' size={22}/></Link></span>
                    </div>
                </div>
                
            </div>
        );
    }

    
}