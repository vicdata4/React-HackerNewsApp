import React from 'react'

export const Search = ({ value, onChange, children, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange}></input>
      <button type="submit">{children}</button>
      </form>
    )
}
