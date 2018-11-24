import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0
  };

  handleClick = () => {
    this.setState();
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        I was clicked {this.state.count} times
      </button>
    );
  }
}

export default App;
