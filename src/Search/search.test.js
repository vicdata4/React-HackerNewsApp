import React from 'react'
import ReactDOM from 'react-dom'
import {Search} from './search'
import renderer from 'react-test-renderer'

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
