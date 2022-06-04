const Persons = ({ persons, filter }) => {
  return(
    persons.filter(p => 
        p.name.toLowerCase()
        .includes(filter.toLowerCase()))
      .map(p =>
        <div key={p.name}>
          {p.name} {p.number}
        </div>
    )
  )
};

export default Persons;