import { isAuthenticated } from "./commonApi";
import Cookies from 'js-cookie';

const API = process.env.REACT_APP_SERVER_API;
const {userId, token} = isAuthenticated();

export const uploadAudio = async(formData) => {

    const {userId, token} = isAuthenticated();

    return fetch(`${API}/uploadAudio/${userId}`,{
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        },
        body: formData
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false, 
            error: 'Something went wrong! Please retry, if error persist, please contact admin.'
        }
    })
}


export const getAllAudio = async() => {

    const {userId, token} = isAuthenticated();

    return fetch(`${API}/getAllAudio/${userId}`,{
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false, 
            error: 'Something went wrong! Please retry, if error persist, please contact admin.'
        }
    })
}

export const getCoverPhoto = async(audioId) => {

    const {userId, token} = isAuthenticated();

    return fetch(`${API}/getCoverPhoto/${userId}/${audioId}`,{
        method: 'GET',
        headers: {
            // Accept: "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(async response => {
        return await response.json();
        // console.log(response);

        // if(response.ok){
        //     return response.blob();
        // }else{
        //     return false;
        // }
    })
    .catch(err => {
        console.log(err.message);
        return {
            success: false, 
            error: 'Something went wrong! Please retry, if error persist, please contact admin.'
        }
    })
}



export const getAudio = async(audioId) => {

    const {userId, token} = isAuthenticated();

    return fetch(`${API}/getAudio/${userId}/${audioId}`,{
        method: 'GET',
        headers: {
            // Range: 'bytes=0-50999',
            // Accept: "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(async response => {
        // response = await response.json();
        if(response.ok){
            const b = await response.blob();
            return {
                success: true,
                blob: b,
            }
        }
        // const blob = await response.blob();
        // const url = URL.createObjectURL(blob);
        // console.log(url);
        return {
            success: false,
            error: 'something went wrong' 
        }

        // if(response.ok){
        //     return response.blob();
        // }else{
        //     return false;
        // }
    })
    .catch(err => {
        console.log(err.message);
        return {
            success: false, 
            error: 'Something went wrong! Please retry, if error persist, please contact admin.'
        }
    })
}

export const updateLikedStatusOfAudio = async(audioId, isLiked) => {
    // console.log(audioId);

    const {userId, token} = isAuthenticated();

    return fetch(`${API}/updateLikedStatus/${userId}/${audioId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(isLiked)
    })
    .then(res => res.json())
    .catch(err => {
        return {
            success: false,
            error: 'something went wrong!'
        }
    })
}


export const deleteAudio = async(audioId) => {

    const {userId, token} = isAuthenticated();

    return fetch(`${API}/deleteAudio/${userId}/${audioId}`,{
        method: 'DELETE',
        headers: {
            // Range: 'bytes=0-50999',
            // Accept: "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err.message);
        return {
            success: false, 
            error: 'Something went wrong! Please retry, if error persist, please contact admin.'
        }
    })
}