import React, { Component, PropTypes } from 'react'
import { MenuItem, Image, DropdownButton } from 'react-bootstrap';
import logoSmall from './assets/Images/logo_small.jpg';
import s from './css/styles.css';

class MobileMenuButton extends Component {
    render() {
        return (
            <DropdownButton className={s.mobileMenuButton}
            id={`mobile-menu-dropdown`} title='Menü'>
                <MenuItem eventKey="1" href='/'>
                    Főoldal
                </MenuItem>
                <MenuItem eventKey="2" href='/calendar'>
                    Naptár
                </MenuItem>
                <MenuItem eventKey="3" href='/finance'>
                    Pénzügyek
                </MenuItem>
                <MenuItem eventKey="4" href='/billing'>
                    Számlák
                </MenuItem>
                <MenuItem eventKey="5" href='/settings'>
                    Beállítások
                </MenuItem>
                <MenuItem eventKey="6" href='/me'>
                    Profiom
                </MenuItem>
                <MenuItem eventKey="7" onClick={() => onLogoutClick()} href='/'>
                    Kijelentkezés
                </MenuItem>
            </DropdownButton>
        )
    }
}

export default class Logout extends Component {

  render() {
    const { onLogoutClick } = this.props

    const imageResponsiveInstance = (
      <Image src={logoSmall} alt='Céglogo' responsive />
    );

    return (
        <header className={s.headerWrapper}>
            <div className={s.contentWider+' '+s.headerContent}>
                <div className={s.logoWrapper}>
                    <a href='/'>
                        {imageResponsiveInstance}
                    </a>
                </div>
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
            </div>
            <div className={s.mobilMenuBackdrop}></div>
        </header>
    )
  }

}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}
