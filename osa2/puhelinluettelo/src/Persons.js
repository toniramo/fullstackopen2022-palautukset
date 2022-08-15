const Persons = ({ persons, filter, handleButtonPress }) => {
  return(
    persons.filter(p => 
        p.name.toLowerCase()
        .includes(filter.toLowerCase()))
      .map(p =>
        <div key={p.name}>
          {p.name} {p.number} <button onClick={() => handleButtonPress(p)}>delete</button>
        </div>
    )
  )
};

export default Persons;