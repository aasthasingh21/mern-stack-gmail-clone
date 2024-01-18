
import axios from 'axios';

// axios can be used in different ways for eg :
// 1 : normal/instant method : axios.get() or axios.post() or axios.delete() etc. depending upon the api calling 
// 2 : interceptors : axios.interceptors.use() 
// 3 : axios api : axios is used as function and an object is passed which has all the information 
// eg : axios({ method: 'post',}) etc.

const API_URI = ''; // backend is running on this port, in production we remove the port mentioned

// since we want it to be called automatically so we put this in middleware(middleware is call after every route(here after every api call))
const API_GMAIL = async (urlObject, payload, type) => {   
    return await axios({    // axios is an asynchronous function so async-await
        method: urlObject.method,
        url:`${API_URI}/${urlObject.endpoint}/${type}`,
        data: payload // when its post api so we get payload which is data here, it remains empty in get
    });
}

export default API_GMAIL;