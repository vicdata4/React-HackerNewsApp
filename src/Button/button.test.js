import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from './button'
import renderer from 'react-test-renderer'

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>Give Me More</Button>, div)
  })
  test('has a valid snapshot', () => {
    const component = renderer.create( <Button>Give Me More</Button> )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
