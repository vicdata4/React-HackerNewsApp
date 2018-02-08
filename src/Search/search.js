import React from 'react'
import PropTypes from 'prop-types'

export const Search = ({ value, onChange, children, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange}></input>
      <button type="submit">{children}</button>
      </form>
    )
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  onSubmit: PropTypes.func
}
