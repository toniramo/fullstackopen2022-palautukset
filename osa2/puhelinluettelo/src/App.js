import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const baseUrl = 'http://localhost:3001';

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

  useEffect(() => {
    axios
      .get(`${baseUrl}/persons`)
      .then(response => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
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