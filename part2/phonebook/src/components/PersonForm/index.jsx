import personService from "../../services";

export const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  setPersons,
  persons,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);
    person
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one? `
        ) &&
        personService
          .update(person.id, { ...person, number: newNumber })
          .then(() =>
            personService
              .getAll()
              .then((res) => setPersons(res.data))
              .catch((e) => console.log(e))
          )
          .catch((e) => console.log(e))
      : personService
          .create({
            name: newName,
            number: newNumber,
          })
          .then(() => {
            personService
              .getAll()
              .then((res) => setPersons(res.data))
              .catch((e) => console.log(e));
            setNewName("");
            setNewNumber("");
          })
          .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
