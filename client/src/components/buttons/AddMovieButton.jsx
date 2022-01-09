import { Button } from "react-bootstrap"
import axios from 'axios';

export default function AddMovieButton(props) {
    const movie = props
    const user = props
    const {toggleShowButton} = props

    function handleAdd(event, movie) {
        event.preventDefault();
        axios
        .post(`/addMovie`, {movie, user})
        .then((response)=>{
            toggleShowButton()
        })
        .catch(console.log)
    }
    return (
        <Button className="m-1" onClick={(event)=>handleAdd(event,movie)} variant="light" style={{"width":"5rem"}}>Add</Button>
    )
}