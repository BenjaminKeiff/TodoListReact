import React from 'react';
import './TodoThing.css';
import editionLogo from './assets/edition.png';
import deleteLogo from './assets/supprimer.png';
import doneLogo from './assets/done.png';
import noneLogo from './assets/none.png';


export default function TodoThing({ TodoThingsProps, onDelete, onClick, onUpdate }) {

  // Je gère les differents clics et j'utilise les fonction dans le composant parent
  const handleDeleteClick = () => {
    onDelete(TodoThingsProps);
  };

  const handleDoneTodo = () => {
    onClick(TodoThingsProps);
  };

  const handleUpdateClick = () => {
    onUpdate(TodoThingsProps);
  };

  return (
    <>
      <div className={`todoCard ${TodoThingsProps.state ? 'done' : ''}`}>
        <div className="todoThing">
          <p>{TodoThingsProps.text}</p>
        </div>
        {/* Selon le state le logo sera different */}
          <img onClick={handleDoneTodo} src={`${TodoThingsProps.state ? noneLogo : doneLogo}`} /> 
          <img onClick={handleUpdateClick} src={editionLogo}/>
          <img onClick={handleDeleteClick} src={deleteLogo}/>
      </div>
    </>
  );
}
