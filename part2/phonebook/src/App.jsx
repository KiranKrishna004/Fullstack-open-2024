import { useState, useEffect } from "react";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import personService from "./services";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState();
  const [style, setStyle] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((res) => setPersons(res.data))
      .catch(() => {
        setMessage("Get Failed");
        setStyle("error");
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        persons={persons}
        setMessage={setMessage}
        setStyle={setStyle}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setMessage={setMessage}
        setStyle={setStyle}
      />
    </div>
  );
};

export default App;
