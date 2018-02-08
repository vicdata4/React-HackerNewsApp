import React, { Component } from 'react'
import { Button } from '../Button/button'

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
