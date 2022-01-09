import { Button } from "react-bootstrap"
import axios from "axios"

export default function RemoveMovieButton(props) {
    const movie = props
    const user = props
    const {toggleShowButton} = props

    function handleRemove(event, movie) {
        event.preventDefault();
        axios
        .post(`/removeMovie`, {movie, user})
        .then((response)=>{
            toggleShowButton()
        })
        .catch(console.log)
    }
    return (
        <Button className="m-1" variant="danger" type="submit"  onClick={(event)=>handleRemove(event,movie)} style={{"width":"5rem"}}>Remove</Button>
    )
}