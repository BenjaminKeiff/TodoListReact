import React from 'react';
import './TodoThing.css';

export default function TodoThing({ TodoThingsProps, onDelete, onClick, onUpdate }) {
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
      <div className='todoCard'>
        <div className={`todoThing ${TodoThingsProps.state ? 'done' : ''}`} onClick={handleDoneTodo}>
          <p>{TodoThingsProps.text}</p>
        </div>
        <div>
          <button onClick={handleUpdateClick}>Modifier</button>
          <button onClick={handleDeleteClick}>Supprimer</button>
        </div>
      </div>
    </>
  );
}
