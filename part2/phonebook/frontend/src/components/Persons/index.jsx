import personService from "../../services";

export const Persons = ({
  filter,
  persons,
  setPersons,
  setMessage,
  setStyle,
}) => {
  const handleDelete = (person) => {
    window.confirm(`Delete ${person.name}`) &&
      personService
        .deleteObj(person.id)
        .then(() => {
          personService
            .getAll()
            .then((res) => setPersons(res.data))
            .catch(() => {
              setMessage("Get Failed");
              setStyle("error");
            });
          setMessage(`Deleted ${person.name}`);
          setStyle("success");
        })
        .catch(() => {
          setMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setStyle("error");
        });
  };

  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)}>delete</button>
      </div>
    ));
};
