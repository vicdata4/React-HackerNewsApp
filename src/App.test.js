import React from 'react'
import ReactDOM from 'react-dom'
import App, { Search, Button, Table } from './App'
import renderer from 'react-test-renderer'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('has a valid snapshot', () => {
    const component = renderer.create( <App /> )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Search', () => {
  /* renders the Search component to the DOM and verifies that there is no error during the rendering process*/
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>, div)
  })
  /* store a snapshot of the rendered component and to run it against a previous snapshot. It fails when the snapshot has changed. */
  test('has a valid snapshot', () => {
    const component = renderer.create( <Search>Search</Search> )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

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

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table { ...props } />, div)
  })
  test('has a valid snapshot', () => {
    const component = renderer.create( <Table { ...props } /> )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
