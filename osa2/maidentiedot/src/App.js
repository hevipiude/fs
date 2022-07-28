import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <CountryList newFilter={newFilter} countries={countries} />
    </div>
  )

}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h4>Languages: </h4>

      <ul>{Object.values(country.languages).map(language =>
        <li key={language}>{language}</li>
      )}</ul>

      <img src={country.flags.svg} width="300" />


    </div>

  )
}

const Filter = ({ newFilter, handleFilterChange }) => {

  return (
    <div> <h1>Search countries</h1>
      Filter shown with: <input
        value={newFilter}
        onChange={handleFilterChange} /></div>
  )
}

const CountryList = ({ newFilter, countries }) => {

  const [selected, setSelected] = useState()

  const visibleCountry = (newFilter && newFilter.length > 0)
    ? countries.filter(({ name }) => name.common.toLowerCase().includes(newFilter.toLowerCase()))
    : countries

  if (selected) {
    return (
      <Country
        country={countries.find(country => country.cca2 === selected)}
      />
    )
  }

  if (visibleCountry.length > 10) {
    return (
      <div>
        <h3>Too many matches</h3>
      </div>
    )
  }

  return (
    <div>
      <h3>Matching countries</h3>
      {visibleCountry.map(country =>
        <p key={country.name.common}>{country.name.common}
          <button onClick={() => setSelected(country.cca2)}>
            {'show'}
          </button></p>

      )}
    </div>
  )

}

export default App


