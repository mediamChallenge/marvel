import { DialogTitle } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler, FC, SyntheticEvent, useState } from 'react'
import { Character } from '../../../../interfaces/types';
import CloseIcon from '@mui/icons-material/Close';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import "./hero.edit.scss";

const HeroEditForm : React.FC<{characterEdit : Character, setCharacterEdit : (c: Character) => void, editCharacter: () => void}> = (props) => {
    const [seriesAdd , setSeriesAdd] = useState<string>('');
    const [comicsAdd , setComicsAdd] = useState<string>('');
    const [storyAdd , setStoryAdd] = useState<string>('');

    // SERIES
    const handleAddSeries = (e: ChangeEvent)=> {
        let el = e.target as HTMLInputElement;
        setSeriesAdd(el.value as string)
    }
      
    const handleRemoveSerie = (item: string)=> {
        console.log(item);
        let editedSeries = props.characterEdit?.series.items.filter((serie)=>{
            if (serie.name.toLowerCase() !== item.toLowerCase()){
            return true
            }
        })
        if (props.characterEdit && editedSeries){
            let editedChar : Character = { ...props.characterEdit , series : { ...props.characterEdit["series"] , items : editedSeries  } };
            props.setCharacterEdit(editedChar);
            console.log(editedChar);
        }
    }

    const addSerie = ()=> {
        if (props.characterEdit && seriesAdd){
            let editedSeries = [...props.characterEdit?.series.items , {resourceURI: '', name: seriesAdd} ];
            let editedChar : Character = { ...props.characterEdit , series : { ...props.characterEdit["series"] , items : editedSeries  } };
            props.setCharacterEdit(editedChar);
        }
    }

    const seriesHeroEdit = props.characterEdit?.series.items.map((item, key) => {
    return (
        <div key={key} className='Hero-detail-feature'>
            <div key={key+"4"}><li>{item.name}</li></div><div onClick={()=>{handleRemoveSerie(item.name)}}><CloseIcon className='Hero-edit-icon-delete'/></div>
        </div>
    )
    });
    const seriesAddButton = 
    <div className='Hero-edit-button-container'>
        <input type="text" placeholder='Add serie' onChange={handleAddSeries}/><button className='Hero-edit-button-add' onClick={addSerie}><AiOutlinePlusCircle/></button>
    </div>;

    // COMICS
    const handleAddComics = (e: ChangeEvent)=> {
        let el = e.target as HTMLInputElement;
        setComicsAdd(el.value as string)
    }
    
    const handleRemoveComic = (item: string)=> {
        console.log(item);
        let editedComics = props.characterEdit?.comics.items.filter((comic)=>{
            if (comic.name.toLowerCase() !== item.toLowerCase()){
            return true
            }
        })
        if (props.characterEdit && editedComics){
            let editedChar : Character = { ...props.characterEdit , comics : { ...props.characterEdit["comics"] , items : editedComics  } };
            props.setCharacterEdit(editedChar);
            console.log(editedChar);
        }
    }

    const addComic = ()=> {
        if (props.characterEdit && comicsAdd){
            let editedComics = [...props.characterEdit?.comics.items , {resourceURI: '', name: comicsAdd} ];
            let editedChar : Character = { ...props.characterEdit , comics : { ...props.characterEdit["comics"] , items : editedComics  } };
            props.setCharacterEdit(editedChar);
        }
    }

    const comicsHeroEdit = props.characterEdit?.comics.items.map((item, key) => {
    return (
        <div key={key} className='Hero-detail-feature'>
            <div key={key+"4"}><li>{item.name}</li></div><div onClick={()=>{handleRemoveComic(item.name)}}><CloseIcon className='Hero-edit-icon-delete'/></div>
        </div>
    )
    });
    
    const comicsAddButton = 
    <div className='Hero-edit-button-container'>
        <input type="text" placeholder='Add comic' onChange={handleAddComics}/><button className='Hero-edit-button-add' onClick={addComic}><AiOutlinePlusCircle/></button>
    </div>;

    // STORIES
    const handleAddstories = (e: any)=> {
        console.log(e.target.value);
        setStoryAdd(e.target.value as string)
    }

    const addStory = ()=> {
        if (props.characterEdit && storyAdd){
            let editedStories = [...props.characterEdit?.stories.items , {resourceURI: '', name: storyAdd, type: ''} ];
            let editedChar : Character = { ...props.characterEdit , stories : { ...props.characterEdit["stories"] , items : editedStories  } };
            props.setCharacterEdit(editedChar);
        }
    }

    const storiesHeroEdit = props.characterEdit?.stories.items.map((item, key) => {
    return (
        <div key={key} className='Hero-detail-feature'>
            <div key={key+"4"}><li>{item.name}</li></div><div onClick={()=>{handleRemoveStory(item.name)}}><CloseIcon className='Hero-edit-icon-delete'/></div>
        </div>
    )
    });

    const storiesAddButton = 
    <div className='Hero-edit-button-container'>
        <input type="text" placeholder='Add story'  onChange={handleAddstories}/><button className='Hero-edit-button-add' onClick={addStory}><AiOutlinePlusCircle/></button>
    </div>;

    const handleRemoveStory = (item: string)=> {
        console.log(item);
        let editedStories = props.characterEdit?.stories.items.filter((comic)=>{
            if (comic.name.toLowerCase() !== item.toLowerCase()){
            return true
            }
        })
        if (props.characterEdit && editedStories){
            let editedChar : Character = { ...props.characterEdit , stories : { ...props.characterEdit["stories"] , items : editedStories  } };
            props.setCharacterEdit(editedChar);
            console.log(editedChar);
        }
    }

    const handleNameEdit = (e: any)=> {
        let name : string = e.target.value;
        if (props.characterEdit){
            let editedChar : Character = { ...props.characterEdit , name : name };
            props.setCharacterEdit(editedChar);
        }
    }
    const handleDescriptionEdit = (e: any)=> {
        let description : string = e.target.value;
        if (props.characterEdit){
            let editedChar : Character = { ...props.characterEdit , description : description };
            props.setCharacterEdit(editedChar);
        }
    }

    return (
        <div className='Hero-edit-form'>
            <div className='Hero-edit-form-title'>EDIT HERO</div>
            <div className='Hero-edit-form-container'>
                <input className='Hero-edit-form-name' placeholder='Name' onChange={handleNameEdit} type="text" value={props.characterEdit?.name} />
                <textarea className='Hero-edit-form-description' placeholder='Description' onChange={handleDescriptionEdit}  value={props.characterEdit?.description}></textarea>
                <div className='Hero-edit-form-title'>
                    Series
                </div>
                {seriesHeroEdit}
                {seriesAddButton}
                <div className='Hero-edit-form-title'>
                    Comics
                </div>
                {comicsHeroEdit}
                {comicsAddButton}
                <div className='Hero-edit-form-title'>
                    Stories
                </div>
                {storiesHeroEdit}
                {storiesAddButton}
            </div>
            <div className='Hero-edit-button-edit'>
            <button onClick={props.editCharacter}>EDIT</button>
            </div>
        </div>
    )
}

export default HeroEditForm