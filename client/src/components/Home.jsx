import AllMoviesButton from "./buttons/AllMoviesButton"
export default function Home(props) {
    return(
        <div className="center">
        <h1>So many movies, so little time!</h1>
        <p>Not sure what to watch? Make a list!</p>
        <AllMoviesButton />
        </div>
    )
}