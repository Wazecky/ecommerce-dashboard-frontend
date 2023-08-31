import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'))
    function logOut() {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div>
            {/* Navbar component from react-bootstrap */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">E-comm</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto navbar_warapper">
                        {
                            localStorage.getItem('user-info') ?
                                <>

                                    <Link to="/">Product List</Link>
                                    <Link to="/add">Add Product</Link>

                                    <Link to="/search">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" /> {/* FontAwesome icon */}
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                        }

                    </Nav>
                    {/* Display user info and Logout option if user is logged in */}
                    {user && (
                        <Nav className="navbar-user">
                            <NavDropdown alignRight title={user.name}>
                                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
