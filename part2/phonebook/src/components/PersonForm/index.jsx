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
    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: newNumber }]);
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
