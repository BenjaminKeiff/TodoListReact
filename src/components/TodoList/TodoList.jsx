import React, { useState } from 'react';
import './TodoList.css';
import TodoThing from '../TodoThing/TodoThing';
import TodoThingsProps from '../TodoThing/TodoThingsProps';
import AddTodoThing from '../TodoThing/AddTodoThing';
import ResetTodoList from './ResetTodoList';

let todoThingsReset = [
  // Ce tableau contient des objets qui sont mes todo de base qui vont me servir d'exemple et pour le reset
  new TodoThingsProps("Finir le powerpoint dossier",false),
  new TodoThingsProps("Finir le powerpoint presentation",false),
  new TodoThingsProps("Preparer la presentation",false)
];

function saveObjectsToLocalStorage(key, objects) {
  // Cette fonction me sert a sauvegarder mes objets dans le local storage
  const serializedObjects = JSON.stringify(objects);
  localStorage.setItem(key, serializedObjects);
}

function getObjectsFromLocalStorage(key) {
  // Cette fonction me sert pour aller chercher mes objets dans le local storage
  const serializedObjects = localStorage.getItem(key);
  if (serializedObjects) {
    // si des éléments sont bien présent alors je parse mon JSON pour y récupéré chacun de mes élements en cas d'erreur j'affiche un message
    try {
      //
      return JSON.parse(serializedObjects);
    } catch (error) {
      console.error(`Erreur de parsing JSON pour la clé "${key}": ${error.message}`);
      return null;
    }
  }

  return null;
}

let todoThings = getObjectsFromLocalStorage("todoThing") || [];
// je récupère mon tableau d'objet du local storage ou en cas d'absence d'iteration, un tableau vide.

export default function TodoList() {
  const [things, setThings] = useState(todoThings);
  // J'initialise mes useState pour pouvoir intéragir avec mes éléments
  const [popUpText, setPopUpText] = useState("");

  const handleAddTodo = (newTodo) => {
    // Fonction ajout de Todo
    if (newTodo.text === "") {
      return newTodo;
    } else {
    setThings((prevThings) => {
      const updatedThings = [...prevThings, newTodo];
      // J'ajoute la nouvelle iteration au tableau et je sauvegarde le tout en local storage
      saveObjectsToLocalStorage("todoThing", updatedThings);
      return updatedThings;
    });
  }};

  const handleResetTodo = () => {
    // Je fais de même mais en utilisant le tableau de base pour le reset
    const resetThings = [...todoThingsReset];
    setThings(resetThings);
    saveObjectsToLocalStorage("todoThing", resetThings);
  };
  
  const handleDeleteTodo = (deleteTodo) => {
    const updatedThings = things.filter(todo => todo !== deleteTodo);
    // Je crée un nouveau tableau en fitrant l'element à supprimé
    setThings(updatedThings);
    saveObjectsToLocalStorage("todoThing", updatedThings);
    setPopUpText(`${deleteTodo.text} a bien été supprimé !`);
    // Je fait apparaitre une popUp et je la fait disparaitre au bout de 2 seconde
    setTimeout(() => {
      setPopUpText('');
    }, 2000);
  };

  
  const handleDoneTodo = (doneThing) => {
    // Si mon todo n'est pas déjà fait alors cette todo aura un background vert et le texte sera rayé
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
    // ne pas faire attention je n'ai pas eu le temps de faire la partie la
    const updatedThings = things.map((todo) =>
      todo.id === updateTodo.id ? { ...todo, text: updateTodo.newText } : todo
    );
  
    setThings(updatedThings);
    saveObjectsToLocalStorage("todoThing", updatedThings);
  };
  
  

  return (
    <div className='todoList'>

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

        <ResetTodoList onReset={handleResetTodo} />
      {popUpText && (
        <div className='popUpDelete'>
          {popUpText}
        </div>
      )}
    </div>
  );
}
