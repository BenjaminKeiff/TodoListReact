import React from 'react';
import './Nav.css';
import burger from "./assets/burger.png"


export default function Nav() {
  return (
    // Ici je construis mon composant nav
    <ul id='nav'>
        <li><a className='link' href="">Accueil</a></li>
        <li><a className='link' href="">TodoList</a></li>
        <img src={burger} alt="" />
    </ul>
  )
}
