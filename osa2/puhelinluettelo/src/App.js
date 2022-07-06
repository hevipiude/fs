import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {

    event.preventDefault()
    console.log('button clicked', event.target)

    const contactObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`Name '${newName}' is already added to the phonebook`)
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`Number '${newNumber}' is already added to the phonebook`)
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }

    console.log(contactObject)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} />
          <div>
            <button type="submit">add</button>
          </div>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <Contact key={person.name} person={person} />
      )}
    </div>
  )

}

const Contact = ({ person }) => {
  return (
    <p>{person.name} {person.number} </p>
  )
}


export default App
