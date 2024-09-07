import { toast } from "react-toastify";

function setUserLocalStorage(set, token = null){
    const twoWeeksExpiration = new Date();
    twoWeeksExpiration.setDate(twoWeeksExpiration.getDate() + 14);
    const data = {
        jwt: token,
        expires: twoWeeksExpiration
    }

    if(set) localStorage.setItem('blog-user', JSON.stringify(data));
    else localStorage.removeItem('blog-user')
}

export async function handleAuth(justLoggedIn, setJustLoggedIn, loginData = null){
    let response;
    try {
        if(!localStorage.getItem('blog-user')){
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-in", { 
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.status === 200) { setUserLocalStorage(true, data.token); return data;}
            else return data;
        } else {
            setUserLocalStorage(false);
            setJustLoggedIn({...justLoggedIn, value: false});
        } 
   } catch(error) {
    throw {fetchError: true, error: error}; 
   }
    
}

export async function notificationPopUp(apiCall, popUpMessage, timeLength){
    return await toast.promise(apiCall, {
        pending: popUpMessage.pending,
        success: {
          render({data}){
            if(data && data.success == false) throw new Error (data.message)
            else return popUpMessage.success
          }
        },
        error: {
          render({data}){
            let popUpMessage = data.message;
            if(data.error) {
            if(data.error.name === 'TypeError') popUpMessage = 'Network error. check connection and try again.'
            else if(data.error.name === 'AbortError') popUpMessage = 'The request was cancelled.'
            }
            return `${popUpMessage}`
          }
        }
      }, {
        autoClose: timeLength
      });
}