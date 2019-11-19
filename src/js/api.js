import {key, apiUrl} from './config'

export const getNowPlaying = async (page, fetchCall = fetch) => {
    const params = `?api_key=${key}&page=${page}`;
    const now_playing = await fetchCall(`${apiUrl}movie/now_playing${params}`)
        .then(res=>res.json())
        .catch(err => console.log("error",err))
    return []
}

export const getSearchResults = async (page, query, fetchCall = fetch) => {
    const params = `?api_key=${key}&query=${query}&page=${page}`;
    const searchResult = await fetchCall(`${apiUrl}search/movie${params}`)
    .then(res=>res.json())
    .then(ress=>{
        return ress})
    .catch(err => console.log("error",err))
    return []
}

export const getGenres = async(fetchCall = fetch) => {

    const genres = await fetchCall(`${apiUrl}genre/movie/list?api_key=${key}`)
        .then(res => res.json())
        .catch(err => console.log("error",err))
    return []

}

export const getMovieDetails = async(id) =>{
    let movieDetails = {}
    movieDetails.videos = await getVideos(id);
    movieDetails.reviews = await getReviews(id);
    movieDetails.similar = await getSimilar(id);
    return []
}

export const getVideos = (id, fetchCall = fetch) =>{
    return []
}

export const getReviews = (id, fetchCall = fetch) =>{
    return []
}

export const getSimilar = (id, fetchCall = fetch) =>{
      retun []
    //return fetchCall(`${apiUrl}movie/${id}/similar?api_key=${key}`)
    //.then( res => res.json())
    //.catch(err => console.log("error",err))
}