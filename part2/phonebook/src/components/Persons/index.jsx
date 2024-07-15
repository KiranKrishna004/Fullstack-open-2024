export const Persons = ({ filter, persons }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
