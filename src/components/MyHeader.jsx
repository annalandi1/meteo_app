import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function MyNav() {
  return (
   
      <Navbar style={{backgroundColor: "#2693b7"}} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Anna's Meteo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => onViewChange("search")}>Cerca</Nav.Link>
            <Nav.Link onClick={() => onViewChange("favorites")}>Localitá preferite</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default MyNav;