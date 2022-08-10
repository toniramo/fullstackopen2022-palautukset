import Country from './Country'
import CountryList from './CountryList';

const SearchResult = ({ result, setNameFilter }) => {
  if (result.length >= 10) return (<>Too many matches, specify another filter</>);
  else if (result.length === 1) return (<Country country={result[0]} />);
  else if (result.length < 10) {
    return (
      <CountryList
        countries={result}
        setNameFilter={setNameFilter} 
      />
    );
  }
}

export default SearchResult;