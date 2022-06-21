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
        text='good' />

      <Button
        handleClick={addNeutral}
        text='neutral' />

      <Button
        handleClick={addBad}
        text='bad' />

      <Header text='statistics' />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad} />


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

const StatisticLine = ({ text, value }) => (

  <>{text} {value} <br /></>

)


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100 + "%"

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}
export default App