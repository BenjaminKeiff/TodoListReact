import React from 'react';

export default function ResetTodoList({ onReset }) {
  // Définit une fonction 'handleResetClick' qui appelle la fonction 'onReset' passée en tant que prop
  const handleResetClick = () => {
    onReset();
  };

  return (
    <div className='resetButton'>
      {/* Bouton avec un gestionnaire d'événements 'onClick' qui appelle la fonction 'handleResetClick' */}
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
}
