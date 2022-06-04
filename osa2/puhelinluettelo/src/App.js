import { useState } from 'react'
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)) {
      return (alert(`${newName} is already added to phonebook.`))
    };
    const personObject = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={nameFilter}
        onChange={handleNameFilterChange} 
      />
      <PersonForm 
        onSubmit = {addPerson}
        nameValue = {newName}
        onNameChange = {handleNameChange}
        numberValue = {newNumber}
        onNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
        <Persons 
          persons={persons} 
          filter={nameFilter}
        />
    </div>
  )

}

export default App