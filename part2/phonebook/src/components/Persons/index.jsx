import personService from "../../services";

export const Persons = ({ filter, persons, setPersons }) => {
  const handleDelete = (id) => {
    personService
      .deleteObj(id)
      .then(() =>
        personService
          .getAll()
          .then((res) => setPersons(res.data))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </div>
    ));
};
