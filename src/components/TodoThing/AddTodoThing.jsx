import React, { useState } from 'react';
import TodoThingsProps from './TodoThingsProps';

export default function AddTodoThing({ onSubmit }) {
  const [text, setText] = useState('');

// Définition d'une fonction nommée handleSubmit qui prend un argument 'e' (événement)
const handleSubmit = (e) => {
  // Empêche le comportement par défaut du formulaire, qui serait de recharger la page
  e.preventDefault();

  // Création d'une nouvelle instance de TodoThingsProps avec la valeur de l'input du formulaire
  const thing = new TodoThingsProps(e.target.todoInput.value);

  // Appel de la fonction onSubmit avec l'objet 'thing' en tant qu'argument
  onSubmit(thing);

  // Réinitialisation du texte de l'input à une chaîne vide, effaçant ainsi le contenu après la soumission
  setText('');
};

  

// Définit une fonction 'handleInputChange' qui met à jour l'état 'text' avec la valeur de l'input
const handleInputChange = (e) => {
  setText(e.target.value);
};

return (
  // Formulaire avec un gestionnaire 'onSubmit' associé à la fonction 'handleSubmit'
  <form className='addThing' onSubmit={(e) => handleSubmit(e)}>
    {/* Étiquette du champ de saisie associée à l'input avec l'id "todoInput" */}
    <label htmlFor="todoInput">Ajouter une tâche</label>

    {/* Input de type texte avec id "todoInput", placeholder, valeur contrôlée par l'état 'text', et gestionnaire 'onChange' */}
    <input
      type="text"
      id="todoInput"
      placeholder="Je dois ..."
      value={text}
      onChange={handleInputChange}
    />

    {/* Div contenant un bouton de type "submit" pour soumettre le formulaire */}
    <div>
      <button type="submit">Todo!</button>
    </div>
  </form>
);

}
