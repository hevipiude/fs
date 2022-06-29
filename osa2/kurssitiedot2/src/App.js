const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ header }) => {
  return (
    <div>
      <h1> {header} </h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>

  )
}

const Total = ({ parts }) => {
  return (
    <div>
      Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </div>
  )
}

export default App
