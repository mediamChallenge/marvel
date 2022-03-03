import axios from "axios";
import md5 from "blueimp-md5";

const pubKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const priKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const unixTs : number = Date.now();
const hash : string =  md5(unixTs+String(priKey)+String(pubKey));

export default axios.create({
    baseURL: "https://gateway.marvel.com/v1/public/characters",
    params : {
      "apikey": pubKey,
      "ts": unixTs,
      "hash": hash
    },
    headers : {
        "Accept" : "*/*"
    }
})