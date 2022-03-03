import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from "../../../api/hero";
import "./heroDetail.scss";
import { Character } from '../../../interfaces/types';
import { changeToSsl } from '../../../utils/secureRequest';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EtagContext } from '../../../App';
import _ from "lodash";

const HeroDetail : React.FC = () => {
    const {id} = useParams();
    const [heroDetail, setHeroDetail] = useState<Character>();
    const useEtag = useContext(EtagContext);
    const characterEtag = useEtag.etag.etag_character

    React.useEffect(() => {
        let apiRoute = `/${id}`;
        let header = {};
        if (characterEtag){
            header = {
                "If-None-Match": characterEtag
            }
        }
        api.get(apiRoute , {headers : header} ).then((response) => {
            if ( response.status === 200){
                console.log(response);
                let character = response.data.data.results[0];
                setHeroDetail(character)
                localStorage.setItem("character" , JSON.stringify(character))
                useEtag.setEtag({ ...useEtag.etag , etag_character : response.data.etag  });
            }
        }).catch((response) => {
            console.log(response);
        });
    }, []);
    
    const storageCharacter : Character = JSON.parse(String(localStorage?.getItem("character")));
    const currCharacter = !_.isEmpty(storageCharacter) ? storageCharacter : heroDetail;
    const sslUrl = changeToSsl(currCharacter?.thumbnail.path+"."+currCharacter?.thumbnail.extension);
    const seriesDetail = currCharacter?.series.items.map((item, key) => {
        return (
            <div key={key} className='Hero-detail-feature'>
                <div key={key+"1"}><li>{item.name}</li></div>
            </div>
        )
    });
    const seriesAccordion = seriesDetail?.length ? 
    (
    <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        >
            <div className='Hero-detail-feature-title'>
                Series
            </div>
        </AccordionSummary>
        <AccordionDetails>
            
        <div className='Hero-detail-feature-description'>
            {seriesDetail}
        </div>
        </AccordionDetails>
    </Accordion>
    ) : <div></div>;
    
    const storiesDetail = currCharacter?.stories.items.map((item, key) => {
        return (
            <div key={key} className='Hero-detail-feature'>
                <div key={key+"2"}><li>{item.name}</li></div>
            </div>
        )
    });

    const storiesAccordion = storiesDetail?.length ? 
    (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
                <div className='Hero-detail-feature-title'>
                    Stories
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className='Hero-detail-feature-description'>
                    {storiesDetail}
                </div>
            </AccordionDetails>
        </Accordion>
    ) : <div></div>;

    const comicsDetail = currCharacter?.comics.items.map((item, key) => {
        return (
            <div key={key} className='Hero-detail-feature'>
                <div key={key+"3"}><li>{item.name}</li></div>
            </div>
        )
    });
    
    const comicsAccordion = comicsDetail?.length ? 
    (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
                <div className='Hero-detail-feature-title'>
                    Comics
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className='Hero-detail-feature-description'>
                    {comicsDetail}
                </div>
            </AccordionDetails>
        </Accordion>
    ) : <div></div>;
    
    const eventsDetail = currCharacter?.events.items.map((item, key) => {
        return (
            <div key={key} className='Hero-detail-feature'>
                <div key={key+"4"}><li>{item.name}</li></div>
            </div>
        )
    });
    const eventsAccordion = eventsDetail?.length ? 
    (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon
            />}
            >
                <div className='Hero-detail-feature-title'>
                    Events
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className='Hero-detail-feature-description'>
                    {eventsDetail}
                </div>
            </AccordionDetails>
        </Accordion>
    ) : <div></div>;

    
    return (
        <>
            <div className='Hero-detail-container'>
                    <div className='Hero-detail-left'>
                        <img className='Hero-detail-left-image' src={sslUrl} alt="Hero Detail MARVEL" />
                        <div className='Hero-detail-left-container'>
                            <div className='Hero-detail-left-name'>
                                {currCharacter?.name.toUpperCase()}
                            </div>
                            <div className='Hero-detail-left-description'>
                                {currCharacter?.description}
                            </div>
                        </div>
                    </div>
                    <div className='Hero-detail-right'>
                        {comicsAccordion}
                        {seriesAccordion}
                        {storiesAccordion}
                        {eventsAccordion}
                    </div>
                </div>
        </>
    )
}

export default HeroDetail