import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export const CustomNavbar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "ms-3 text-decoration-none text-white" : "ms-3 text-decoration-none text-secondary");
    return (
            <Navbar bg="dark" variant="dark">
                <Container className="justify-content-start">
                    <Navbar.Brand>HELEN BLANC</Navbar.Brand>
                    <NavLink className={setActiveClass} to="/" >
                    Home
                    </NavLink>
                    <NavLink className={setActiveClass} to="/favorite" >
                    Favorite
                    </NavLink>
                </Container>
            </Navbar>
    );
};

export default CustomNavbar;