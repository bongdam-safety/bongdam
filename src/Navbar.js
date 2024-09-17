import React,{useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [active,setActive] = useState(' ');

    const handleClick = (menu) => {
        setActive(menu);
    };

    return (
        <nav className="navbar">
            <ul>
                <li className = {active==='login'? 'active': ''}onClick={()=>handleClick('login')} >
                   <Link to ="/login"> 로그인</Link>
                </li>
                <li className = {active==='add'? 'active': ''}onClick={()=>handleClick('add')} >
                    <Link to = "/add">시설물 추가 요청 </Link>
                </li>
                <li className = {active==='updateRequest'? 'active': ''}onClick={()=>handleClick('updateRequest')} >
                   <Link to = "/updateRequest">정보 수정 요청 </Link>
                </li>
            </ul>
        </nav>
    );

}

export default Navbar;