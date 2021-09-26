import axios from "axios"
import { URL_API } from "../Helper"

class HTTP {
    get = (url) =>{
        return axios.get(URL_API + url)
    }
}

export default new HTTP()