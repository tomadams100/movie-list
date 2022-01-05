export default function Search(props) {
    const {searchButton} = props
    return (
        <div>
            <input onChange={searchButton} type="search" id="site-search" name="q" aria-label="Search through site content"></input>
        </div>
    )
}