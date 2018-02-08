import React, { Component } from 'react'
import { Button } from '../Button/button'
import PropTypes from 'prop-types'

export class Table extends Component {
  render() {
    const {list, onDismiss} = this.props
    const smallColumn = {
      width: '10%'
    }
    return (
      <div className="table">
        {list.map(item =>
          <div key={item.objectID} className="table-row">
              <span style={{width:'40%'}}><a href={item.url}>{item.title}</a></span>
              <span style={{width:'30%'}}> Author: {item.author}</span>
              <span style={{smallColumn}}> nºComments: {item.num_comments}</span>
              <span style={{smallColumn}}> Points: {item.points}</span>
              <span style={{smallColumn}}><Button onClick={() => onDismiss(item.objectID)} className="button-inline">Dismiss</Button></span>
            </div>
        )}
      </div>
    )
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func
}
