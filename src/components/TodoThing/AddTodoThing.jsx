import React, { useState } from 'react';
import TodoThingsProps from './TodoThingsProps';

export default function AddTodoThing({ onSubmit }) {
  const [text, setText] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  const thing = new TodoThingsProps(e.target.todoInput.value);
  onSubmit(thing);
  setText('');
};

const handleInputChange = (e) => {
  setText(e.target.value);
};

return (
  <form className='addThing' onSubmit={(e) => handleSubmit(e)}>
    <label htmlFor="todoInput">Ajouter une tâche</label>
    <input
      type="text"
      id="todoInput"
      placeholder="Je dois ..."
      value={text}
      onChange={handleInputChange}
    />
    <div>
      <button type="submit">Todo!</button>
    </div>
  </form>
);

}
