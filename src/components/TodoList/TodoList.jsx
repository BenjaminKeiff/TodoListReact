import React, { useState } from 'react';
import './TodoList.css';
import TodoThing from '../TodoThing/TodoThing';
import TodoThingsProps from '../TodoThing/TodoThingsProps';
import AddTodoThing from '../TodoThing/AddTodoThing';
import ResetTodoList from './ResetTodoList';

let todoThings = [
  new TodoThingsProps("Finir le powerpoint dossier"),
  new TodoThingsProps("Finir le powerpoint presentation"),
  new TodoThingsProps("Preparer la presentation")
];

export default function TodoList() {
  const [things, setThings] = useState(todoThings);

  const [popUpText, setPopUpText] = useState(""); // État pour gérer la visibilité de la pop-up

  const handleAddTodo = (newTodo) => {
    setThings([...things, newTodo]);
  };

  const handleResetTodo = (doneTodo) => {
    // Logique de réinitialisation ici
    setThings(todoThings);
  };

  const handleDeleteTodo = (deleteTodo) => {
      // Utiliser setTimeout pour effacer le texte de la pop-up après un délai
      setPopUpText(deleteTodo.text); // Définir le texte de la pop-up
      setTimeout(() => {
        setPopUpText('')
      }, 2000); // Modifier la valeur (en millisecondes) selon vos besoins
    const updatedThings = things.filter(todo => todo !== deleteTodo);
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
        <TodoThing key={index} TodoThingsProps={thing} onDelete={() => handleDeleteTodo(thing)} />
      ))}

      {/* Pop-up */}
      {popUpText && (
        // Si popUpText est vrai (existe et n'est pas une chaîne vide), alors rendre le Pop-up visible
        <div className='popUpDelete'>
          {popUpText} a bien été supprimé !
        </div>
      )}
    </div>
  );
}
