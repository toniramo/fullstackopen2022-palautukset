import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchResult from './SearchResult'
import SearchBar from './SearchBar';

function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    setCountriesToShow(
      countries.filter(c =>
        c.name.common.toLowerCase().includes(nameFilter.toLowerCase()))
    );
  }, [nameFilter, countries])

  const handleNameFilterChange = ((event) => {
    setNameFilter(event.target.value);
  });

  return (
    <div>
      <SearchBar onChange={handleNameFilterChange} value={nameFilter} />
      <SearchResult result={countriesToShow} setNameFilter={setNameFilter} />
    </div>
  );
}

export default App;
