import React, { useContext, useState } from 'react';  
import "./hero.scss";
import HeroCard from '../../Core/HeroCard';
import api from "../../../api/hero";
import Searchbox from '../../Core/Searchbox';
import { Character } from '../../../interfaces/types';
import { EtagContext } from '../../../App';
import Dialog from '@mui/material/Dialog';
import HeroEditForm from '../../Hero/Form/Edit';
import HeroDeleteForm from '../../Hero/Form/Delete';

const Hero : React.FC = () => {
  const [dialogOpen , setDialogOpen] = useState<boolean>(false);
  const [characters , setCharacters] = useState<Character[]>([]);
  const [currentSearch , setCurrentSearch] = useState<string>('');
  const [characterEdit , setCharacterEdit] = useState<Character>();
  const [characterDelete , setCharacterDelete] = useState<number>();
  
  var useEtag = useContext(EtagContext);

  React.useEffect(() => {
    const charactersEtag = useEtag.etag.etag_characters;
    const pageParam = {
      "offset" : 1205,
      "limit" : 16,
    };
    let reqConfig : any = {
      params: pageParam
    }
    let header = {};
    if (useEtag.etag.etag_characters){
      header = {
        "If-None-Match": charactersEtag
      }
    }
    if (Object.keys(header).length) {
        reqConfig = {...reqConfig , headers : header}
    }
    let _getCharacters : Character[] = JSON.parse(String(localStorage?.getItem("characters")));
    console.log(_getCharacters)
    if (_getCharacters?.length){
    } else {
      api.get("" , reqConfig ).then((response) => {
        if ( response.status === 200){
          console.log("------")
          let _characters : Character[] = response.data.data.results;
          localStorage.setItem("characters" , JSON.stringify(_characters))
          setCharacters(_characters);
          useEtag.setEtag({ ...useEtag.etag , etag_characters : response.data.etag  });
        }
      }).catch((response) => {
        console.log(response)
      });
    }

  }, []);
  
  const handleHeroSearch = (search : string) => {
    if (currentSearch !== search){
      setCurrentSearch(search);
    }
  }
  const handleCharacterEdit = (c : Character) => {
    setDialogOpen(true);
    setCharacterEdit(c);
  }
  const handleCharacterDelete = (n : number) => {
    setDialogOpen(true);
    setCharacterDelete(n);
  }
  const handleDialogClose = (e:any) => {
    setCharacterEdit(undefined);
    setDialogOpen(false);
  }
  const handleCharacterFavorite = (id : number) => {
    let editedCharacters = currCharacters.map((character) => {
      if (character.id === id){
        character.favorite = !character.favorite;
      }
      return character;
    })
    localStorage.setItem("characters" , JSON.stringify(editedCharacters));
    setCharacters(editedCharacters);
  }
  
  const storageCharacters : Character[] = JSON.parse(String(localStorage?.getItem("characters")));
  const currCharacters = storageCharacters?.length ? storageCharacters : characters;
  const filtered = currCharacters.filter((character) => {
    let filterFlag = false;
    // Name search
    let nameSearch = character.name.toLocaleLowerCase().includes(currentSearch.toLocaleLowerCase());
    if (nameSearch){
      filterFlag = true;
    }
    // Comic search
    character.comics.items.map((item)=>{
      let comicsSearch = item.name.toLocaleLowerCase().includes(currentSearch.toLocaleLowerCase());
      if (comicsSearch){
        filterFlag = true;
      }
    })
    // Series search
    character.series.items.map((item)=>{
      let seriesSearch = item.name.toLocaleLowerCase().includes(currentSearch.toLocaleLowerCase());
      if (seriesSearch){
        filterFlag = true;
      }
    })
    // Stories search
    character.stories.items.map((item)=>{
      let storiesSearch = item.name.toLocaleLowerCase().includes(currentSearch.toLocaleLowerCase());
      if (storiesSearch){
        filterFlag = true;
      }
    })
    // Events search
    character.events.items.map((item)=>{
      let storiesSearch = item.name.toLocaleLowerCase().includes(currentSearch.toLocaleLowerCase());
      if (storiesSearch){
        filterFlag = true;
      }
    })
    return filterFlag
  }).map((charac ,key)=>{
    return <HeroCard key={key} character={charac} onCharacterEdit={handleCharacterEdit} onCharacterDelete={handleCharacterDelete} onCharacterFavorite={handleCharacterFavorite}/>
  })

  const heroCards = filtered.length ? filtered : <div>No results found</div>;
  
  const editCharacter = () => {
    console.log(characterEdit)
    let editedCharacters = currCharacters.map((character) => {
      if (character.id === characterEdit?.id){
        character.name = characterEdit.name;
        character.description = characterEdit.description;
        character.series.items = characterEdit.series.items;
        character.comics.items = characterEdit.comics.items;
        character.stories.items = characterEdit.stories.items;
      }
      return character;
    })
    localStorage.setItem("characters" , JSON.stringify(editedCharacters));
    setCharacters(editedCharacters);
    setDialogOpen(false);
  }
  const deleteCharacter = () => {
    const filteredCharacters = currCharacters.filter((character) => {
      if (character.id !== characterDelete){
        return true;
      }
    })
    console.log(filteredCharacters);
    localStorage.setItem("characters" , JSON.stringify(filteredCharacters));
    setDialogOpen(false);
  }
  const cancelDelete = () => {
    setDialogOpen(false);
  }

  console.log(characterEdit);
  const editOrRemove = characterEdit ? <HeroEditForm characterEdit={characterEdit} setCharacterEdit={setCharacterEdit} editCharacter={editCharacter}/> : <HeroDeleteForm cancelDelete={cancelDelete} deleteCharacter={deleteCharacter}/>;

  return (
    <>
        <div className='Page-hero-container'>
          <Searchbox handleSearch={(text : string) => handleHeroSearch(text) }/>
          <div className='Page-hero-container-cards'>
            {heroCards}
          </div>
        </div>
          <Dialog onClose={handleDialogClose} open={dialogOpen}>
            {editOrRemove}
          </Dialog>
    </>
  )
}

export default Hero