const CourseHeader = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Total number of exercises {sum}</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => <Part part={part} key={part.id} />)}
  </>

const Course = ({ course }) => {
  const sum = course.parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b, 0);

  return(
  <>
    <CourseHeader course={course.name} />
    <Content parts={course.parts} />
    <Total sum={sum} />
  </>
  )
}

export default Course