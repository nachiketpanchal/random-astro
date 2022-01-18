import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [data, setData] = useState([]);
    useEffect(()=>{
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
                            <div key={el} className="card card-sm mb-3 mx-auto">
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
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
  }
  
  export default Home;
  