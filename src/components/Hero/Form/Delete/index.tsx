import React from 'react';
import "./hero.delete.scss";
const HeroDeleteForm : React.FC<{cancelDelete : () => void , deleteCharacter : () => void }>= (props) => {
    return (
        <div className='Hero-delete-form'>
            <div className='Hero-delete-form-title'>Delete Hero</div>
            <div className='Hero-delete-form-description'>¿Are you sure you want to delete this hero?</div>
            <div className='Hero-delete-button-container'>
                <button onClick={props.cancelDelete} className='Hero-delete-button-cancel'>CANCEL</button>
                <button onClick={props.deleteCharacter} className='Hero-delete-button-confirm'>CONFIRM</button>
            </div>
        </div>
    )
}

export default HeroDeleteForm