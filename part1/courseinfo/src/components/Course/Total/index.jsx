export const Total = ({ parts }) => (
  <b>
    total of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
  </b>
);
