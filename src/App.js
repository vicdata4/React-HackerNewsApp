import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const DEFAULT_HPP = '100'
const PARAM_HPP = 'hitsPerPage='

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}redux&${PARAM_PAGE}0&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }
  setSearchTopStories(result) {
    const { hits, page } = result
    const oldHits = page !== 0 ? this.state.result.hits : []
    const updatedHits = [...oldHits,...hits]

    this.setState({result: { hits:updatedHits, page }})
  }
  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e)
  }
  onSearchSubmit(event) {
    const {searchTerm} = this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }
  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId)
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    })
  }
  onClickMe() {
    console.log(this)
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

    render() {
    const vicdataText = 'HackerNews VD'
    const { searchTerm, result } = this.state
    const page = (result && result.page) || 0
    if (!result) {return null}
    return (
      <div className="page">
        <div className="interactions">
          <h2>{vicdataText}</h2>
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search:</Search>
        </div>
        { result &&
        <Table list={result.hits} onDismiss={this.onDismiss} />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>More</Button>
        </div>
      </div>

    );
  }
}

const Search = ({ value, onChange, children, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange}></input>
      <button type="submit">{children}</button>
      </form>
    )
}

class Table extends Component {
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

function Button(props) {
    const { onClick, className = '', children } = props
    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    )
}

export default App;
