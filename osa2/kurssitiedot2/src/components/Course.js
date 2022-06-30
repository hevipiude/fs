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
            <h2> {header} </h2>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
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
    const value = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <h4>
                Total of {value} exercises
            </h4>
        </div>
    )
}

export default Course