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
    const index = persons.findIndex(p => p.name === newName);
    if (index >= 0) {
      if (window.confirm(
        `${newName} is already added to phonebook. 
        Do you want to replace the old number with a new one?`)) {
        const person = { ...persons[index], "number": newNumber }
        personsService.update(person);
        let updatedPersons = [...persons];
        updatedPersons[index] = person;
        setPersons(updatedPersons);
      }
    } else {
      const person = { "name": newName, "number": newNumber };
      personsService
        .add(person)
        .then(response =>
          setPersons(persons.concat(response.data)));
    }
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

  const handleDelete = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      personsService.del(person.id);
      setPersons([...persons].filter(p => p.id !== person.id));
    }
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
        handleButtonPress={handleDelete}
      />
    </div>
  )

}

export default App