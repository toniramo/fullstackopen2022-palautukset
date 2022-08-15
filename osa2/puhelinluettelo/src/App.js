import { useState, useEffect } from 'react'
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import personsService from "./services/Persons"
import Notification from "./Notification"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState({ "message": null, "type": null });

  const addPerson = (event) => {
    event.preventDefault();
    const index = persons.findIndex(p => p.name === newName);
    if (index >= 0) {
      if (window.confirm(
        `${newName} is already added to phonebook. 
        Do you want to replace the old number with a new one?`)) {
        const person = { ...persons[index], "number": newNumber }
        personsService
          .update(person)
          .then(() => {
            let updatedPersons = [...persons];
            updatedPersons[index] = person;
            setPersons(updatedPersons);
            showNotification(`Updated information of ${newName}.`, "info");
          })
          .catch(() => handleError(person));
      }
    } else {
      const person = { "name": newName, "number": newNumber };
      personsService
        .add(person)
        .then(response => {
          setPersons(persons.concat(response.data));
          showNotification(`Added ${newName}`, "info");
        });
    }
    setNewName("");
    setNewNumber("");
  }

  const showNotification = (message, type) => {
    setNotification({
      "message": message,
      "type": type
    });
    setTimeout(() => {
      clearNotification();
    }, 5000)
  }

  const clearNotification = () => {
    setNotification({ "message": null, "type": null })
  }

  const handleError = (person) => {
    showNotification(
      `Information of ${person.name} has already been removed from server.`,
      "error");
    personsService
      .getAll()
      .then(response => setPersons(response.data));
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
      personsService
        .del(person.id)
        .then(() => {
          setPersons([...persons].filter(p => p.id !== person.id));
          showNotification(`Deleted ${person.name}.`, "info");
        })
        .catch(() => handleError(person));
    }
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response.data));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        value={nameFilter}
        onChange={handleNameFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Notification message={notification.message} type={notification.type} />
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