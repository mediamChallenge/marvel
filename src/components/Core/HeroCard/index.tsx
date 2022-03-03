import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { changeToSsl } from "../../../utils/secureRequest";
import { Character } from "../../../interfaces/types";
import "./heroCard.scss";
import { useState } from "react";
import { AiFillEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const HeroCard : React.FC<{character : Character, onCharacterEdit : (c: Character) => void , onCharacterDelete : (n : number) => void,  onCharacterFavorite : (n : number) => void }> = (props) => {
    const [showIcons, setShowIcons] = useState(Boolean);
    let sslUrl = changeToSsl(props.character.thumbnail.path+"."+props.character.thumbnail.extension);
    const detailRoute = `/detail/${props.character.id}`;

    useEffect(()=>{
        if (window.innerWidth < 900){
            if (showIcons === false){
                setShowIcons(true);
            }
        }
    } , [showIcons])
    const handleEdit = (e : any) => {
        e.stopPropagation();
        e.preventDefault();
        props.onCharacterEdit(props.character);
    }
    const handleDelete = (e : any) => {
        e.stopPropagation();
        e.preventDefault();
        props.onCharacterDelete(props.character.id);
    }
    const handleFavorite = (e : any , b: boolean) => {
        e.stopPropagation();
        e.preventDefault();
        props.onCharacterFavorite(props.character.id);
    }
    
    const toggleFavoriteIcon = props.character?.favorite ? <StarIcon onClick={(ev)=>handleFavorite(ev , false)} className='Hero-card-icon-favorite'/> : <StarBorderIcon onClick={(ev)=>handleFavorite(ev , true)} className='Hero-card-icon-favorite'/> ;
    const toggleIcons = showIcons ? <>
        {toggleFavoriteIcon}
        <BsTrash className='Hero-card-icon-trash' onClick={handleDelete}/>
        {props.character.name}
        <AiFillEdit className='Hero-card-icon-edit' onClick={handleEdit}/> 
    </>: <>{props.character.name}</>;
    return (
        <Link to={detailRoute}>
            <div onMouseEnter={()=>setShowIcons(true)} onMouseLeave={()=>setShowIcons(false)} className='Hero-card'>
                <img className='Hero-card-image' src={sslUrl} alt="Hero-card-image" />
                <div className='Hero-card-name'>
                    {toggleIcons}
                </div>
            </div>
        </Link>
    )
}

export default HeroCard

