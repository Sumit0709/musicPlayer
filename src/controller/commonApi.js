

// save token and sessionId into local storage
export const authenticate = (data, next) => {
    if(typeof window != "undefined"){
        localStorage.setItem("musicPlayer", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("musicPlayer")){
        return JSON.parse(localStorage.getItem("musicPlayer"))
    }
    else return false;
}