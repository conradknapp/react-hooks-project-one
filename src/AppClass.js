import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0
  };

  handleClick = () => {
    // updating the value of state based on the previous value.
    // this.setState({
    //   count: this.state.count + 1
    // });
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
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
