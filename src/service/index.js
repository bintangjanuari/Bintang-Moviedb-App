import axios from 'axios';

const apiKey = `17bfb3e2f33213de2abcce9b6775e1a1`;
const url = 'https://api.themoviedb.org/3';
const nowPlaying = `${url}/movie/now_playing`;
const topRatedMovie = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviemovieUrl = `${url}/discover/movie`;
const actorUrl = `${url}/trending/person/week`;

export const fetchMovies = async () => {
    try {
        const {data} = await axios.get(nowPlaying, {
            params: {
                api_key : apiKey,
                language : 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        
        return modifiedData;
    } catch(error) {}
}

export const fetchGenre = async () => {
    try {
        const {data} = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        })) 
        
        return modifiedData;
    }catch(error){}
}

export const fetchMoviesByGenre = async (genre_id) => {
    try {
        const {data} = await axios.get(moviemovieUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        
        console.log(modifiedData)
        return modifiedData;
    }catch(error) { }
}

export const fetchActors = async () => {
    try {
        const {data} = await axios.get(actorUrl, {
            params: {
                api_key: apiKey
            }
        })
        const modifiedData = data['results'].map((p) => ({
            id: p['id'],
            popularity: p['popularity'],
            name: p['name'],
            profileImg: 'https://image.tmdb.org/t/p/w200' + p['profile_path'],
            known: p['known_for_department']
        }))
        return modifiedData;
    }catch (error) { }
}

export const fetchTopRatedMovie = async () => {
    try{
        const {data} = await axios.get(topRatedMovie, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData;
    }catch(erro) { }
}

export const fetchMovieDetail = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                // page: 1
            }
        });
        return data;
    }catch(error) {}
}

export const fetchMoviesVideos = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
                //language: 'en_US'
            }
            
        });
        return data['results'][0];
    }catch(error) { }
}

export const fetchCast = async (id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        const modifiedData = data['cast'].map((a) => ({
            id: a['cast_id'],
            character: a['character'],
            name: a['name'],
            img: 'https://image.tmdb.org/t/p/w200' + a['profile_path'],

        }));

        return modifiedData;
    }catch(error) {}
}

export const fetchSimiliarMovie = async (id) => {
    try {
        const {data} = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
            
        });

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))
        return modifiedData;
    }catch(error) {}
}

