import React from 'react'
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useState } from 'react'
import { fetchActors, fetchGenre, fetchMovies, fetchMoviesByGenre, fetchTopRatedMovie } from '../../service/index';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import  ReactStars  from 'react-rating-stars-component'



export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [moviesByGenre, setMovieByGenre] = useState([]);
    const [actor, setActor] = useState([]);
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMoviesByGenre(28));
            setActor (await fetchActors());
            setTopRated (await fetchTopRatedMovie())
        };
        fetchAPI();
    }, []);

    const handleCategoryClick = async (genre_id) => {
        setMovieByGenre(await fetchMoviesByGenre(genre_id));
    }
    const movies = nowPlaying?.slice(0, 5).map((item, index) => {
        return (
            <div style={{height: 500, width: "100%"}} key={index}>
                <div className="carousel-center">
                    <img style={{height: 600}} src={item.backPoster} alt= {item.title} />
                    
                </div>
                <div className="carousel-center">
                  
                </div>
                <div className="carousel-caption"style={{textAlign: "center", fontSize: 40 }}>{item.title}</div>
            </div>
        )
    });

    const genreList = genres?.map((item, index) => {
        return(
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={() => {
                    handleCategoryClick(item.id)
                }}>
                    {item.name}
                </button>
            </li>
        )
    })

    const movieList = moviesByGenre?.slice(0, 4).map((item, index) => {
        return(
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}/>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight: "bolder"}}>{item.title}</p>
                    <p>Rating: {item.rating}</p>
                    <ReactStars
                       count={item.rating}
                       size={20}
                       color= {'#f4c10f'} 
                    ></ReactStars>
                </div>
            </div>
        )
    })

    const trendingActor = actor.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 text-center" key={index}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={item.profileImg} alt={item.name}></img>
                <p className="font-weight-bold mt-3 text-center">{item.name}</p>
                <p className="font-weight-light text-center" style={{ color: "#5a606b"}}>
                    Trending for {item.known}
                </p>
            </div>
        )
    });

    const topRatedList= topRated.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title} />
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight: "bolder"}}>{item.title}</p>
                    <p>Rating: {item.rating}</p>
                    <ReactStars
                       count={item.rating}
                       size={20}
                       color= {'#f4c10f'} 
                    ></ReactStars>
                </div>
            </div>
        )
    });
    return (
        <div className="container">
            <div className="row mt-2">
                <div className="col">
                    <Carousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={1000}
                        version={4}
                        indicators={false}
                    >
                        {movies}
                    </Carousel>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3" >
                <div className="col">
                    <div className="arrow-right-icon" style={{float: 'right'}}>
                        <i class="bi bi-arrow-right-square-fill"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{movieList}</div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: "#5a606b"}}></p>
                        Trending Actor on This Week
                </div>
            </div>
            <div className="row mt-3" >
                <div className="col">
                    <div className="arrow-right-icon" style={{float: 'right'}}>
                        <i class="bi bi-arrow-right-square-fill"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                {trendingActor}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: "#5a606b"}}>
                        Top Rated Movies
                    </p>
                </div>
            </div>
            <div className="row mt-3" >
                <div className="col">
                    <div className="arrow-right-icon" style={{float: 'right'}}>
                        <i class="bi bi-arrow-right-square-fill"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{topRatedList}</div>

            <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}></hr>
            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{color: "#5a606b"}}>
                    <h3>About Me</h3>
                    <p>Hello my name is Bintang Al Akbar Januari. I'am a Frontend Developer. This website is part of my portofolio</p>
                    <h3>Visit Me:</h3>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="https://www.instagram.com/bintang.anotherone/" style={{color: "black", fontSize: 30}}>
                                <i class="bi bi-instagram"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://github.com/bintangjanuari" style={{color: "black", fontSize: 30}}>
                                <i class="bi bi-github"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="https://www.facebook.com/herzegovet/" style={{color: "black", fontSize: 30}}>
                                <i class="bi bi-facebook"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6" style={{color: "#5a606b"}}>
                    <h3>Keep In Touch</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <i class="bi bi-pin-map"></i> Address: Kembangan, Jakarta Barat 11620
                                </strong>
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i class="bi bi-envelope"></i> Email: akbarbintang9991@gmail.com
                                </strong>
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <i class="bi bi-whatsapp"></i> Whatsapp: +62881-6101-994 (Whatsapp Only)
                                </strong>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Home;
