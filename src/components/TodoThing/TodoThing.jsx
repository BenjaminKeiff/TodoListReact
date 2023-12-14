import React, { useState } from 'react';
import './TodoThing.css';

export default function TodoThing({ TodoThingsProps, onDelete, onClick }) {
  const [color, setColor] = useState("");

  const handleDeleteClick = () => {
    onDelete(TodoThingsProps);
  };
  const handleDoneTodo = () => {
    if (color !== "done") {
      setColor('done');
    }
    else {
      setColor('');
    }
  };

  return (
    
    <div className={`todoThing ${color}`} onClick={handleDoneTodo}>
      <p>{TodoThingsProps.text}</p>
      <button onClick={handleDeleteClick}>Done</button>
    </div>
  );
}
