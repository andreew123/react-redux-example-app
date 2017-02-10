import React, { Component, PropTypes } from 'react'
import { MenuItem, Image, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logoSmall from './assets/Images/react.png';
import s from './css/styles.css';

export default class Header extends Component {

  render() {
    const { isAuthenticated, dispatch, onLogoutClick } = this.props

    const imageResponsiveInstance = (
      <Image src={logoSmall} alt='Céglogo' />
    );

    return (
        <div>
            <Navbar collapseOnSelect>
                <Navbar.Header className={s.logoWrapper}>
                  <Navbar.Brand>
                    <a href='/'>{imageResponsiveInstance}</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav className={s.navBarWrapper}>
                    <LinkContainer to="/">
                        <NavItem eventKey={1}>Főoldal</NavItem>
                    </LinkContainer>
                    {/*<LinkContainer to="/calendar">
                        <NavItem eventKey={2}>Naptár</NavItem>
                    </LinkContainer>*/}
                    <LinkContainer to="/finance">
                        <NavItem eventKey={3}>Pénzügyek</NavItem>
                    </LinkContainer>
                    {/*}<LinkContainer to="/billing">
                        <NavItem eventKey={4}>Számlák</NavItem>
                    </LinkContainer>*/}
                    <LinkContainer to="/settings">
                        <NavItem eventKey={5}>Beállítások</NavItem>
                    </LinkContainer>
                  </Nav>
                  <Nav pullRight className={s.navBarWrapper}>
                      {/*}<LinkContainer to="/me">
                          <NavItem eventKey={1}>Profilom</NavItem>
                      </LinkContainer>*/}
                      <LinkContainer to="/">
                        <NavItem eventKey={2}
                            onClick={() => onLogoutClick()}>
                            Kijelentkezés
                        </NavItem>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/*}<header className={s.headerWrapper}>
                <div className={s.contentWider+' '+s.headerContent}>
                    <div className={s.logoWrapper}>
                        <a href='/'>
                            {imageResponsiveInstance}
                        </a>
                    </div>
                    {isAuthenticated &&
                        <div className={s.menuPointWrapper}>
                            <div className={s.menuPoint}>
                                <a href='/' className={s.greenText}>Főoldal</a>
                            </div>
                            <div className={s.menuPoint}>
                                <a href='/calendar'>Naptár</a>
                            </div>
                            <div className={s.menuPoint}>
                                <a href='/finance'>Pénzügyek</a>
                            </div>
                            <div className={s.menuPoint}>
                                <a href='/billing'>Számlák</a>
                            </div>
                            <div className={s.menuPoint}>
                                <a href='/settings'>Beállítások</a>
                            </div>
                            <div className={s.menuPoint}>
                                <a href='/me'>Profilom</a>
                            </div>
                            <div className={s.menuPoint}>
                                <a href='/' onClick={() => onLogoutClick()}>Kijelentkezés</a>
                            </div>
                        </div>
                    }
                </div>
            </header>*/}
        </div>
    )
  }

}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}
