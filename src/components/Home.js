import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";

function Home() {
    const [data, setData] = useState([]);
    const [likedImages, setLikedImages] = useState({});
    const like = (event) => {
        let likes = JSON.parse(localStorage.getItem("likes"));
        const imageId = event.currentTarget.id;
        if(likes[imageId] === undefined){
            likes[imageId] = 1;
            event.currentTarget.innerHTML = '<i class="fas fa-heart"></i>';
        }else{
            delete likes[imageId];
            event.currentTarget.innerHTML = '<i class="far fa-heart"></i>';
        }
        setLikedImages(likes);
        localStorage.setItem("likes", JSON.stringify(likes));
    };
    useEffect(()=>{
        localStorage.getItem("likes") === null 
            ? localStorage.setItem("likes", JSON.stringify({}))
            : console.log('Liked data available');
        setLikedImages(JSON.parse(localStorage.getItem("likes")));

        axios.get('https://api.nasa.gov/planetary/apod?count=10&api_key=' + process.env.REACT_APP_NASA_API_KEY)
        .then(function (response) {
            console.log(response);
            if(response.request.status === 200){
                setData(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]);
    return (
        <div className="container">
            <div className="jumbotron">
                <div className="text-center mb-5">
                    <h1>Random Astro</h1>
                </div>
                <div className="mb-5">
                    {data.length === 0 
                        ? "Loading data..."
                        : data.map((el) => (
                            <div key={el.title} className="card card-sm mb-3 mx-auto">
                                <div className="card-body">
                                    <div className="mb-3">
                                        {
                                            el.media_type === 'image' 
                                            ? <img src={el.url} alt={el.title}/> 
                                            : <iframe src={el.url} title={el.title}></iframe>
                                        }
                                    </div>
                                    <p>{el.title}</p>
                                    <p className="text-muted">{el.date}</p>
                                    {
                                        likedImages[md5(el.title)] !== undefined 
                                        ? <button id={md5(el.title)} className="btn-like" onClick={(e) => like(e)}><i className="fas fa-heart"></i></button>
                                        : <button id={md5(el.title)} className="btn-like" onClick={(e) => like(e)}><i className="far fa-heart"></i></button>
                                    }
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
  }
  
  export default Home;
  