import React, { useState } from 'react'
import "./searchBox.scss";
import { FaSearch } from 'react-icons/fa';

const Searchbox : React.FC<{handleSearch : Function}> = (props : any) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (ev : string) => {
        setSearchText(ev);
        props.handleSearch(ev);
    }
    return (
        <div className='core-searchbox'>
            <div className='core-searchbox-container'>
                <FaSearch className='core-searchbox-icon'/>
                <input onChange={(e) => handleSearchChange(e.target.value)} type="text" placeholder='Type name, comic, story or serie'/>
            </div>
        </div>
    )
}

export default Searchbox