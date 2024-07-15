const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

export const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

export const Total = ({ parts }) => (
  <b>
    total of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
  </b>
);

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
