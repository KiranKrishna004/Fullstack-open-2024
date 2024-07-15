import { useState } from "react";

const Button = ({ handleFeedback, feedback }) => {
  console.log("clicked");
  return <button onClick={handleFeedback}>{feedback}</button>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button feedback={"good"} handleFeedback={() => setGood(good + 1)} />
      <Button
        feedback={"neutral"}
        handleFeedback={() => setNeutral(neutral + 1)}
      />
      <Button feedback={"bad"} handleFeedback={() => setBad(bad + 1)} />

      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {good + neutral + bad}</p>
      <p>average: {(good * 1 + bad * -1) / (good + neutral + bad)}</p>
      <p>positive: {good / (good + neutral + bad)}</p>
    </div>
  );
};

export default App;
