import { useState, useEffect } from 'react'
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import personsService from "./services/Persons"

const App = () => {
  const [persons, setPersons] = useState([]);
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
    personsService.add(personObject);
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
    personsService
      .getAll()
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