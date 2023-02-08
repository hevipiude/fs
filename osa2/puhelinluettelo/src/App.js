import { useState, useEffect } from 'react'
import PersonService from './services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    PersonService.getPersons().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <ContactForm
        setPersons={setPersons}
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <ContactList newFilter={newFilter} persons={persons} />
    </div>
  )
}

const Contact = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
    </p>
  )
}

const ContactList = ({ newFilter, persons }) => {
  const visiblePersons =
    newFilter && newFilter.length > 0
      ? persons.filter(({ name }) =>
          name.toLowerCase().includes(newFilter.toLowerCase())
        )
      : persons
  return (
    <div>
      <h3>Numbers</h3>
      {visiblePersons.map((person) => (
        <Contact key={person.name} person={person} />
      ))}
    </div>
  )
}
const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      {' '}
      <h3>Filter</h3>
      Filter shown with:{' '}
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const ContactForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  setPersons,
  persons,
  handleNameChange,
  handleNumberChange,
}) => {
  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const contactObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`Name '${newName}' is already added to the phonebook`)
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`Number '${newNumber}' is already added to the phonebook`)
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
      PersonService.addPerson(contactObject)
    }
  }

  return (
    <div>
      <h3>Add new</h3>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
          <div>
            <button type='submit'>add</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App
