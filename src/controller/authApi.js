const API = process.env.REACT_APP_SERVER_API;

export const register = async (body) => {

    return fetch(`${API}/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: 'Something went wrong! Please retry. If error persist, contact admin.'
        }
    })
}

export const login = async (body) => {

    return fetch(`${API}/login`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: 'Something went wrong! Please retry. If error persist, contact admin.'
        }
    })
}


export const logout = async () => {
    if(typeof window != "undefined"){

        return fetch(`${API}/logout`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json"
            },
        })
        .then(async(res)=>{
            const response = await res.json();
            localStorage.removeItem("musicPlayer");
            return response
        })
        .catch((err) => {
            // console.log(err.message);
            return {
                success: false
            }
        });
    }
}