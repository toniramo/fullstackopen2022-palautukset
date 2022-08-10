import Country from './Country'

const SearchResult = ({ result }) => {
  if (result.length >= 10) return (<>Too many matches, specify another filter</>);
  else if (result.length === 1) return (<Country country={result[0]} />);
  else if (result.length < 10) {
    return (
      <table>
        <tbody>
          {result.map(country =>
            <tr key={country.name.common}><td>{country.name.common}</td></tr>)}
        </tbody>
      </table>
    );
  }
}

export default SearchResult;