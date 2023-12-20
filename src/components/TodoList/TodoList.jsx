import React, { useState } from 'react';
import './TodoList.css';
import TodoThing from '../TodoThing/TodoThing';
import TodoThingsProps from '../TodoThing/TodoThingsProps';
import AddTodoThing from '../TodoThing/AddTodoThing';
import ResetTodoList from './ResetTodoList';

let todoThingsReset = [
  new TodoThingsProps("Finir le powerpoint dossier",false),
  new TodoThingsProps("Finir le powerpoint presentation",false),
  new TodoThingsProps("Preparer la presentation",false)
];

function saveObjectsToLocalStorage(key, objects) {
  const serializedObjects = JSON.stringify(objects);
  localStorage.setItem(key, serializedObjects);
}

function getObjectsFromLocalStorage(key) {
  const serializedObjects = localStorage.getItem(key);

  if (serializedObjects) {
    try {
      return JSON.parse(serializedObjects);
    } catch (error) {
      console.error(`Erreur de parsing JSON pour la clé "${key}": ${error.message}`);
      return null;
    }
  }

  return null;
}

let todoThings = getObjectsFromLocalStorage("todoThing") || [];

export default function TodoList() {
  const [things, setThings] = useState(todoThings);

  const [popUpText, setPopUpText] = useState("");

  const handleAddTodo = (newTodo) => {
    setThings((prevThings) => {
      const updatedThings = [...prevThings, newTodo];
      saveObjectsToLocalStorage("todoThing", updatedThings);
      return updatedThings;
    });
  };

  const handleResetTodo = () => {
    const resetThings = [...todoThingsReset];
    setThings(resetThings);
    saveObjectsToLocalStorage("todoThing", resetThings);
  };
  
  const handleDeleteTodo = (deleteTodo) => {
    const updatedThings = things.filter(todo => todo !== deleteTodo);
  
    setThings(updatedThings);
  
    saveObjectsToLocalStorage("todoThing", updatedThings);
  
    setPopUpText(`${deleteTodo.text} a bien été supprimé !`);
  
    setTimeout(() => {
      setPopUpText('');
    }, 2000);
  };

  
  const handleDoneTodo = (doneThing) => {
    const updatedThings = things.map(todo => {
      if (todo === doneThing) {
        todo.state = !todo.state; 
      }
      return todo;
    });
  
    saveObjectsToLocalStorage("todoThing", updatedThings);
    setThings(updatedThings);
  };

  const handleUpdateTodo = (updateTodo) => {
    const updatedThings = things.map((todo) =>
      todo.id === updateTodo.id ? { ...todo, text: updateTodo.text } : todo
    );
  
    setThings(updatedThings);
    saveObjectsToLocalStorage("todoThing", updatedThings);
  };
  

  return (
    <div className='todoList'>
      <ResetTodoList onReset={handleResetTodo} />

      <AddTodoThing onSubmit={handleAddTodo} />

      {things.map((thing) => (
        <TodoThing
          key={thing.id}
          TodoThingsProps={thing}
          onUpdate={handleUpdateTodo}
          onClick={() => handleDoneTodo(thing)}
          onDelete={() => handleDeleteTodo(thing)}
        />
      ))}

      {popUpText && (
        <div className='popUpDelete'>
          {popUpText}
        </div>
      )}
    </div>
  );
}
