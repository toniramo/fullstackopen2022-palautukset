const SearchBar = ({ onChange, value }) => {
    return (
        <div>
            <label>Find countries </label>
            <input onChange={onChange} value={value} />
        </div>
    );
}

export default SearchBar;