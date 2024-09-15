import { toast } from "react-toastify";

function setUserLocalStorage(set, userData = null){
    const twoWeeksExpiration = new Date();
    twoWeeksExpiration.setDate(twoWeeksExpiration.getDate() + 14);
    const data = {
        jwt: userData ? userData.token : userData,
        expires: twoWeeksExpiration
    }

    if(set) {localStorage.setItem('blog-visitor', JSON.stringify(data)); localStorage.setItem('blog-userId', JSON.stringify(userData.user.id));}
    else {localStorage.removeItem('blog-visitor'); localStorage.removeItem('blog-userId');}
}

export function capitalizeName(name){
    const splitNameAndLowerCase = name.toLowerCase().split(' ');
   const capitalizedNamesArray = splitNameAndLowerCase.map((name) =>  name[0].toUpperCase() + name.slice(1));
    return capitalizedNamesArray.join(' ');
}

export async function handleAuth(justLoggedIn, setJustLoggedIn, loginData = null){
    let response;
    try {
        if(!localStorage.getItem('blog-visitor')){
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-in", { 
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.status === 200) { setUserLocalStorage(true, data); return data;}
            else return data;
        } else {
            setUserLocalStorage(false);
            setJustLoggedIn({...justLoggedIn, value: false});
        } 
   } catch(error) {
    throw {fetchError: true, error: error}; 
   }
    
}

export async function signUpForAccount(signUpData){
    let response;
    try {
        response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/sign-up", {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        });
        const data = await response.json();
        return data;
    } catch(error) {
        throw {fetchError: true, error: error}; 
       }
}

export async function notificationPopUp(apiCall, popUpMessage, timeLength){
    return await toast.promise(apiCall, {
        pending: popUpMessage.pending,
        success: {
          render({data}){
            if(data && data.success == false) throw new Error()
            else if (data.errors) throw new Error()
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

export async function getPublishedPosts(){
    try {
        const response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/?limit=3", { //limits results to 3 to keep the 'homepage' simple
            headers: {
                "Content-Type": "application/json",
             }
        });
        const data = await response.json();
        return data.allPosts;
    } catch(error) {
        throw {fetchError: true, error: error}; 
    }
}

export async function getSpecificPost(id){
    try {
        const response = await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${id}`);
        const data = await response.json();
        return data;
    } catch(error) {
        throw {fetchError: true, error: error}; 
    }
}