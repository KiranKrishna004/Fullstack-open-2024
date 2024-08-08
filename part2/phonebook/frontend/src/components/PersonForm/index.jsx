import personService from "../../services";

export const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  setPersons,
  persons,
  setMessage,
  setStyle,
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
              .catch(() => {
                setMessage("Get Failed");
                setStyle("error");
              })
          )
          .catch((e) => {
            setMessage(`Failed updating ${person.name}`);
            setStyle("error");
          })
      : personService
          .create({
            name: newName,
            number: newNumber,
          })
          .then(() => {
            personService
              .getAll()
              .then((res) => setPersons(res.data))
              .catch(() => {
                setMessage("Get Failed");
                setStyle("error");
              });
            setNewName("");
            setNewNumber("");
            setMessage(`Added ${newName}`);
            setStyle("success");
          })
          .catch(() => {
            setMessage(`Failed Adding ${newName}`);
            setStyle("error");
          });
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
