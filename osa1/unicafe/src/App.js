import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const add = (prev) => prev + 1

  const addGood = () => setGood(add)
  const addNeutral = () => setNeutral(add)
  const addBad = () => setBad(add)

  return (
    <div>

      <Header text='give feedback' />

      <Button
        handleClick={addGood}
        text='good'
      />
      <Button
        handleClick={addNeutral}
        text='neutral'
      />
      <Button
        handleClick={addBad}
        text='bad'
      />

      <Header text='statistics' />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

    </div>
  )
}

const Header = ({ text }) => {
  return (
    <div>
      <h1>
        {text}
      </h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  return (
    <p>

      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      total {total} <br />
      average {average} <br />
      positive {positive}%

    </p >
  )
}
export default App