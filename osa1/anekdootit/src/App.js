import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
]

const App = () => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const maxPoints = points.indexOf(Math.max(...points))

  const showStuff = () => (setSelected((Math.floor(Math.random() * anecdotes.length))))
  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}<br />
      has {points[selected]} votes<br />
      <Button handleClick={showStuff} text="next anectode" />
      <Button handleClick={addVote} text="vote" /><br />
      <Header text='Anecdote with most votes' />
      {anecdotes[maxPoints]}<br />
      has {points[maxPoints]} votes

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

export default App