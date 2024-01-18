// we can make custom hooks in react "use" is important as all the hooks starts with use(usestate/useeffect etc)

import { useState } from "react";
import API_GMAIL from "../services/api";

const useApi = (urlObject) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // the loading sign to show that its loading

    const call = async (payload, type = "") => {  // payload is taken from sentEmail function and type from getEmailsFromType
        setResponse(null); // when new function/api is called it should as new (if not changed then last stored state will be shown)
        setError(""); // similar as setResponse
        setIsLoading(true); // as the function is called, loading starts

        try {
            let res = await API_GMAIL(urlObject, payload, type);
            setResponse(res.data);  // if api call successful, will give the data 
        } catch (error) {
            setError(error.message); // if not successful show the error
        } finally {
            setIsLoading(false); // irrespective of the result, loding state will end
        }
    }
    return { call, response, error, isLoading}; // incase we dont return anything here then getEmailServices will have undefined value(error)-{just for information}
};

export default useApi;