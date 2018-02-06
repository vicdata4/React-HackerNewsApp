import React, { Component } from 'react';
import './App.css';


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
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
    this.onClickMe = this.onClickMe.bind(this);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id
    const updatedList = this.state.list.filter(isNotId)
    this.setState({ list: updatedList })
  }
  onClickMe() {
    console.log(this)
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

    render() {
    const vicdataText = 'Vicdata4'
    const { searchTerm, list } = this.state
    return (
      <div className="App">
        <h2>{vicdataText}</h2>
      <Search value={searchTerm} onChange={this.onSearchChange}>Search:</Search>
      <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
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
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
              <span><a href={item.url}>{item.title}</a></span>
              <span> Author: {item.author}</span>
              <span> nºComments: {item.num_comments}</span>
              <span> Points: {item.points}</span>
              <span><Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button></span>
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
