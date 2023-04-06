import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const HeaderNav = () => { 
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand>
          <Link to="/">
            <img
              alt="Logo"
              src=""
              width="30"
              height="30" 
              className="d-inline-block align-top"
            />
            
          </Link>
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">Test Page</Nav.Link>
          </Nav>
          <Nav>
            {1 ? (
              <Nav.Link href="#connected">Connected</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );


};

export default HeaderNav;