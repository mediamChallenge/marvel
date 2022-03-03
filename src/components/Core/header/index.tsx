import React from 'react'
import { Link } from 'react-router-dom';
import "./header.scss";

const Header : React.FC = () => {
  return (
<div className='Header'>
    <div className='Header-title'>
        <Link to="/">
            MEDIA MONKS
        </Link>
    </div>
</div>
  )
}

export default Header