import { useState } from "react";

const Button = ({ handleFeedback, feedback }) => {
  return <button onClick={handleFeedback}>{feedback}</button>;
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <tr>
            <td>all</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good * 1 + bad * -1) / (good + neutral + bad)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td> {(good / (good + neutral + bad)) * 100}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
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
      {bad + good + neutral === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

export default App;
