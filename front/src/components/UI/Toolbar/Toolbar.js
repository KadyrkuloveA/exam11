import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import AnonymousMenu from "./AnonymousMenu";
import {logoutUser} from "../../../store/actions/usersActions";
import UserMenu from "./UserMenu";
import {withRouter} from "react-router";


const Toolbar = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">Seller</NavbarBrand>

            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/" exact>Selling</NavLink>
                </NavItem>
                {user ? (
                    <>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/addItem" exact>Add Item</NavLink>
                        </NavItem>
                        <UserMenu
                            logout={() => dispatch(logoutUser())}
                            user={user}
                        />
                    </>
                ) : (
                    <AnonymousMenu/>
                )}
            </Nav>
        </Navbar>
    );
};

export default withRouter(Toolbar);