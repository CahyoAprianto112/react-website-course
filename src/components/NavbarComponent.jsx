import { useState, useEffect, useRef } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { navLinks } from "../data/index";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
    const [changeColor, setChangeColor] = useState(false);
    const navbarCollapseRef = useRef(null);

    const changeBackgroundColor = () => {
        if (window.scrollY > 10) {
            setChangeColor(true);
        } else {
            setChangeColor(false);
        }
    };

    const closeNavbar = () => {
        if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    useEffect(() => {
        changeBackgroundColor();
        window.addEventListener('scroll', changeBackgroundColor);
        return () => {
            window.removeEventListener('scroll', changeBackgroundColor);
        };
    }, []);

    return (
        <div>
            <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
                <Container>
                    <Navbar.Brand href="#home" className="fs-3 fw-bold">Course.</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" ref={navbarCollapseRef}>
                        <Nav className="mx-auto text-center">
                            {navLinks.map((link) => {
                                return (
                                    <div className="nav-link" key={link.id}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active" : ""
                                            }
                                            end
                                            onClick={closeNavbar}
                                        >
                                            {link.text}
                                        </NavLink>
                                    </div>
                                );
                            })}
                        </Nav>
                        <div className="text-center">
                            <button className="btn btn-outline-danger rounded-1">Join With Us</button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;
