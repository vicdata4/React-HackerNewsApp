import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url)

/*
const list = [
{
  title: 'React',
  url: 'https://facebook.github.io/react/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0
},
{
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1
}
];

const user = {firstname: 'Robin', lastname: 'Wieruch'}
console.log(user)
const { firstname, lastname } = user
console.log(firstname + ' ' + lastname)
const users = ['Luis', 'Andrew', 'Dan']
console.log(users)
const [
  userOne,
  userTwo,
  userThree
] = users
console.log(userOne + '>>>' + userTwo + '>>>' + userThree)
*/
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
    this.onClickMe = this.onClickMe.bind(this);
  }
  setSearchTopStories(result) {
    this.setState({result})
  }
  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId)
    this.setState({
      /*result: Object.assign({}, this.state.result, { hits: updatedHits })*/
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
    const vicdataText = 'Vicdata4'
    const { searchTerm, result } = this.state
    if (!result) {return null}
    return (
      <div className="page">
        <div className="interactions">
          <h2>{vicdataText}</h2>
          <Search value={searchTerm} onChange={this.onSearchChange}>Search:</Search>
        </div>
      <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
        {/*<button onClick={this.onClickMe} type="button">Click Me</button>*/}
      </div>

    );
  }
}

const Search = ({ value, onChange, children }) => {
    return (
      <form>
        {children}<input type="text" value={value} onChange={onChange}></input>
      </form>
    )
}

class Table extends Component {
  render() {
    const {list, pattern , onDismiss} = this.props
    const smallColumn = {
      width: '10%'
    }
    return (
      <div className="table">
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID} className="table-row">
              <span style={{width:'20%'}}><a href={item.url}>{item.title}</a></span>
              <span style={{width:'50%'}}> Author: {item.author}</span>
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
