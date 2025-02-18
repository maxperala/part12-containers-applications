import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from "../Todos/Todo"

const testTodo = {
    text: "testing",
    done: "false"
}

describe('Testing todo', () => {
    it('renders the correct text', () => {
      render(<Todo todo={testTodo} onClickComplete={() => null} onClickDelete={() => null}/>)
      const element = screen.getByText("testing")
      expect(element).toBeInTheDocument()
    })
  })