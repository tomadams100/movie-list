import { useEffect, useState } from "react";
import axios from 'axios';

export default function All_Movies(props) {
    const [allMovies, setAllMovies] = useState(null)
    useEffect(()=>{
        axios.get(`https://imdb-api.com/en/API/Top250Movies/${process.env.REACT_APP_API_KEY}`)
        .then(response=>{
            setAllMovies(response.data.items)
        })
        .catch(console.log)
    },[])
    return(
        <div>
            <ul>
                {
                    allMovies.map(movie=>{
                        return(
                            <li>{movie.title}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}