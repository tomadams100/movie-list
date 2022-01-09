import { Form, FormControl, Button } from "react-bootstrap"
export default function Search(props) {
    const {searchButton} = props
    return (
        <div>
            {/* <input onChange={searchButton} type="search" id="site-search" name="q" aria-label="Search through site content"></input> */}
        <Form className="mx-auto w-50">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2 search text-light"
          aria-label="Search"
          name="q"
          onChange={searchButton}
          id="site-search"
        />
        </Form>
        </div>
    )
}