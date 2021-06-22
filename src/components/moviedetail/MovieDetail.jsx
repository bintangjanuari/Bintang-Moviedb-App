import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { fetchCast, fetchMovieDetail, fetchMoviesVideos, fetchSimiliarMovie } from '../../service';
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";



export function MovieDetail({ match }) {
    let params = match.params;
    let genres = [];
    const [isOpen, setIsOpen] = useState(false);
    const [movieDetail, setMovieDetail] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [cast, setCasts] = useState([]);
    const [similiarMovie, setSimiliarMovie] = useState([]);
    

    useEffect(() => {
        const fetchAPI = async () => {
            setMovieDetail(await fetchMovieDetail(params.id));
            setTrailer(await fetchMoviesVideos(params.id));
            setCasts(await fetchCast(params.id));
            setSimiliarMovie(await fetchSimiliarMovie(params.id));
        };

        fetchAPI();
    }, [params.id]);

    genres = movieDetail.genres;

    const MovieModal = (props) => {
        const youtubeLink = 'https://www.youtube.com/watch?v=';
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{color: '#000000', fontWeight: 'bolder'}}
                    >
                        {movieDetail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: '#000000'}}>
                    <ReactPlayer
                        className="container-fluid"
                        url={youtubeLink + trailer.key}
                        playing
                        width="100%"
                    >   

                    </ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }

    let listGenre;
    if(genres) {
        listGenre = genres.map((item, index) => {
            return(
                <li className="list-inline-item" key={index}>
                    <button type="button" className="btn btn-outline-info">
                        {item.name}
                    </button>
                 </li>
            )
        })
    }
    // const listGenre = genres.map((item, index) => {
    //     return (
    //        <li className="list-inline-item" key={index}>
    //            <button type="button" className="btn btn-outline-info">
    //                {item.name}
    //            </button>
    //        </li>
    //     )
    // })

    const listCast = cast.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 text-center" key={index}>
                <img className="img-fluid rounded-circle mx-auto d-block" src={item.img} alt={item.name}></img>
                <p className="font-weight-bold mt-3 text-center">{item.name}</p>
                <p className="font-weight-light text-center" style={{ color: "#5a606b"}}>
                    {item.character}
                </p>
            </div>
        )
    })

    const similiarMovieList = similiarMovie?.slice(0, 4).map((item, index) => {
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
    return (
        <div className="container">
            <div className="row mt-2">
                <MovieModal
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false);
                    }}
                >

                </MovieModal>
                <div className="col text-center" style={{width: "100%"}}>
                    <Carousel>
                        <div>
                            <img className="img-fluid" src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`} alt={movieDetail.tittle}></img>
                            
                            <p 
                                onClick={() => setIsOpen(true)}
                                className="legend"
                                style={{fontWeight: 'bold', fontSize: 30, color: 'white', cursor: 'pointer'}}>{movieDetail.title}</p>
                        </div>
                    </Carousel>
                    {/* <img className="img-fluid" src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`} alt={movieDetail.tittle}></img>
                    <div className="carousel-center" >
                        
                        <i 
                            className="bi bi-youtube"
                            style={{fontSize: 100, color: "red", cursor: 'pointer'}}
                        ></i>
                    </div> */}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p style={{color:"5a606b", fontWeight: "bolder", fontSize: 35}}>Genre</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {listGenre}
                    </ul>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className="text-center">
                        <ReactStars
                            count={movieDetail.vote_average}
                            size={20}
                            color={'#f4c10f'}
                        ></ReactStars>
                    </div>
                    <div className="mt-3">
                        <p style={{fontSize: 35, fontWeight: 'bold'}}>Synopsis</p>
                        {movieDetail.overview}
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <p style={{fontWeight: 'bolder', fontSize: 35}}>Release Date</p>
                    <p style={{fontWeight: 'bolder', fontSize:20, color: 'blueviolet'}}>{movieDetail.release_date}</p>
                </div>
                <div className="col-md-3">
                    <p style={{fontWeight: 'bolder', fontSize: 35}}>Duration</p>
                    <p style={{fontWeight: 'bolder', fontSize:20, color: 'blueviolet'}}>{movieDetail.runtime}</p>
                </div>
                <div className="col-md-3">
                    <p style={{fontWeight: 'bolder', fontSize: 35}}>Budget</p>
                    <p style={{fontWeight: 'bolder', fontSize:20, color: 'blueviolet'}}>{movieDetail.budget}</p>
                </div>
                <div className="col-md-3">
                    <p style={{fontWeight: 'bolder', fontSize: 35}}>Homepage</p>
                    <p style={{fontWeight: 'bolder', fontSize:20, color: 'blueviolet'}}>{movieDetail.homepage}</p>
                </div>
            </div>

            <div className="row mt-3">
                    {listCast}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <p style={{color:"5a606b", fontWeight: "bolder", fontSize: 35}}>Similiar Movies</p>
                </div>
            </div>

            <div className="row mt-3">
                {similiarMovieList}
            </div>
            
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


