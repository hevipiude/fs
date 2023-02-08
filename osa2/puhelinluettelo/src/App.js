import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import PersonService from './services/PersonService'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')

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

  const removeContact = (person, id) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService.removePerson(id).then(() => {
        setPersons((current) => current.filter((person) => person.id !== id))
      })
      setMessage(`Contact "${person.name}" removed succesfully`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const updateContact = (contactObject) => {
    const newPersons = persons.map((person) => {
      if (person.name === contactObject.name) {
        PersonService.updatePerson(person.id, contactObject)
        return { ...person, number: contactObject.number }
      }
      return person
    })

    setPersons(newPersons)
    setMessage(`Contact "${contactObject.name}" updated succesfully`)
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const addContact = (contactObject) => {
    setPersons([...persons, contactObject])
    PersonService.addPerson(contactObject)
    setMessage(`Contact "${contactObject.name}" added succesfully`)
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setMessage('')
      window.location.reload(false)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
        updateContact={updateContact}
        addContact={addContact}
      />
      <ContactList
        newFilter={newFilter}
        persons={persons}
        removeContact={removeContact}
      />
    </div>
  )
}

const Contact = ({ person, removeContact }) => {
  return (
    <p>
      {person.name} {person.number}
      <button type='button' onClick={() => removeContact(person, person.id)}>
        delete
      </button>
    </p>
  )
}

const ContactList = ({ newFilter, persons, removeContact }) => {
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
        <Contact
          key={person.name}
          person={person}
          removeContact={removeContact}
        />
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
  persons,
  handleNameChange,
  handleNumberChange,
  updateContact,
  addContact,
}) => {
  const addOrUpdate = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `A number for ${newName} already exists, do you want to replace the old number with a new one?`
        )
      ) {
        updateContact(contactObject)
      }
    } else {
      addContact(contactObject)
    }
  }

  return (
    <div>
      <h3>Add new</h3>
      <form onSubmit={addOrUpdate}>
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
