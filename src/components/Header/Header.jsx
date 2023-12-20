import React from 'react';
import Nav from '../Nav/Nav';
import logo from './assets/logo-todolist.png';
import './Header.css';



export default function Header() {
  return (
    // Composant header contenant un composant "nav"
    <header id='header'>
        <div>
            <img id='logo' src={logo} alt="" />
            <h1 id='title'>ToDoFast</h1>
        </div>
        <Nav />
    </header>
  )
}
