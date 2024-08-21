import React, { useContext } from 'react'
import { UserContext } from '../userContext';
import { Form , Button } from 'react-bootstrap';


//reuseable trackBar in mainPage and trackPage
export const TrackBar = () => {

const {setSearch, handleSearch,search} = useContext(UserContext)

  return (
    <Form
    className="d-flex"
    onSubmit={(e) => {
      e.preventDefault();
      handleSearch(search);
    }}
  >
    <Form.Control
      type="search"
      placeholder="Tracking Number"
      className="me-2"
      aria-label="Search"
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
    <Button type="submit"  className="d-flex justify-content-center align-items-center">
    <i className='bx bx-search-alt bx-sm'></i>
    </Button>
  </Form>
  )
}
