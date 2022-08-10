const Country = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            capital {country.capital.toString()}<br />
            area {country.area}
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.svg} height="200" alt="flag" />
        </>
    )
}

export default Country;