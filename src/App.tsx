import React, { Dispatch, SetStateAction, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Hero from "./components/Page/Hero";
import HeroDetail from './components/Page/HeroDetail';
import Header from './components/Core/header';
import './App.css';

interface IEtags {
  etag_characters : string;
  etag_character : string;
}
interface ContextTag {
  etag: IEtags;
  setEtag: (type:IEtags) => void;
}
export const EtagContext = React.createContext<ContextTag>({} as ContextTag);

function App() {
  const [etag , setEtag] = useState<IEtags>({etag_characters : "" , etag_character : ""});

  return (
    <EtagContext.Provider value={{etag ,  setEtag }}>
      <Router>
        <div className="App">
          <Header/>
          <Routes>
            <Route path='/' element={< Hero />}></Route>
            <Route path='/detail/:id' element={< HeroDetail />}></Route>
          </Routes>
        </div>
      </Router>
    </EtagContext.Provider>
  );
}

export default App;
