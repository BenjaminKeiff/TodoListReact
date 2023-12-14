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

// Fonction pour récupérer un tableau d'objets depuis le Local Storage
function getObjectsFromLocalStorage(key) {
  const serializedObjects = localStorage.getItem(key);

  if (serializedObjects) {
    try {
      // Tenter de convertir la valeur en tableau d'objets JavaScript
      return JSON.parse(serializedObjects);
    } catch (error) {
      // Gérer les erreurs de parsing JSON
      console.error(`Erreur de parsing JSON pour la clé "${key}": ${error.message}`);
      return null;
    }
  }

  return null;
}

let todoThings = getObjectsFromLocalStorage("todoThing") || [];

export default function TodoList() {
  const [things, setThings] = useState(todoThings);

  const [popUpText, setPopUpText] = useState(""); // État pour gérer la visibilité de la pop-up

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
    console.log(deleteTodo.text);
    // Filtrer les tâches pour exclure la tâche à supprimer
    const updatedThings = things.filter(todo => todo !== deleteTodo);
    console.log(updatedThings);
  
    // Mettre à jour l'état avec la nouvelle liste de tâches
    setThings(updatedThings);
  
    // Mettre à jour le Local Storage
    saveObjectsToLocalStorage("todoThing", updatedThings);
  
    // Afficher la pop-up après la suppression
    setPopUpText(`${deleteTodo.text} a bien été supprimé !`);
  
    // Effacer la pop-up après un délai
    setTimeout(() => {
      setPopUpText('');
    }, 2000);
  };

  
  const handleDoneTodo = (doneThing) => {
    const updatedThings = things.map(todo => {
      if (todo === doneThing) {
        todo.state = !todo.state; // Inverse l'état actuel
      }
      return todo;
    });
  
    saveObjectsToLocalStorage("todoThing", updatedThings);
    setThings(updatedThings);
  };
  
  const handleUpdateTodo = (doneThing) => {
    const updatedThings = things.map(todo => {
      if (todo === doneThing) {
        todo.state = !todo.state; // Inverse l'état actuel
      }
      return todo;
    });
  
    saveObjectsToLocalStorage("todoThing", updatedThings);
    setThings(updatedThings);
  };
  


  // Rendu du composant
  return (
    <div className='todoList'>
      {/* Composant 'AddTodoThing' avec la prop 'onSubmit' définie sur la fonction 'handleAddTodo' */}
      <AddTodoThing onSubmit={handleAddTodo} />

      {/* Composant 'ResetTodoList' avec la prop 'onReset' définie sur la fonction 'handleResetTodo' */}
      <ResetTodoList onReset={handleResetTodo} />

      {/* Map sur le tableau 'things' pour afficher chaque élément avec le composant 'TodoThing' */}
      {things.map((thing, index) => (
        <TodoThing key={index} TodoThingsProps={thing} onUpdate={() => handleUpdateTodo(thing)} onClick={() => handleDoneTodo(thing)} onDelete={() => handleDeleteTodo(thing)} />
      ))}



      {/* Pop-up */}
      {popUpText && (
        // Si popUpText est vrai (existe et n'est pas une chaîne vide), alors rendre le Pop-up visible
        <div className='popUpDelete'>
          {popUpText}
        </div>
      )}
    </div>
  );
}
