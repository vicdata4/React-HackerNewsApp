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
    return (
      <div className="App">
        <h2>{vicdataText}</h2>
       <form>
         <input type="text" onChange={this.onSearchChange}></input>
       </form>
        // <button onClick={this.onClickMe} type="button">Click Me</button>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
          <div key={item.objectID}>
              <span><a href={item.title}>{item.title}</a></span>
              <span> Author: {item.author}</span>
              <span> nºComments: {item.num_comments}</span>
              <span> Points: {item.points}</span>
              <span><button onClick={() => console.log(item.objectID)} type="button">Dismiss</button></span>
            </div>
        )}
      </div>
    );
  }
}

export default App;
