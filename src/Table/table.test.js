import React from 'react'
import ReactDOM from 'react-dom'
import {Table} from './table'

import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    sortKey: 'TITLE',
    isSortReverse: false
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
  /* The assertion simply checks if the element has two elements with the class table-row */
  it('shows two items in list', () => {
    const element = shallow( <Table { ...props } /> )
    expect(element.find('.table-row').length).toBe(2)
  })
})
