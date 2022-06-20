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

      <Display counter={good}
        text='good' />
      <Display counter={neutral}
        text='neutral' />
      <Display counter={bad}
        text='bad' />

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

const Display = ({ text, counter }) => {
  return (
    <div>
      {text} {counter}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / total
  const positive = (props.good / total) * 100

  return (
    <p>
      total {total}<br />
      average {average}<br />
      positive {positive}%

    </p>

  )
}
export default App