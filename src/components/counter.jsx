import React, { Component } from "react";
import { tsImportEqualsDeclaration, thisExpression } from "@babel/types";

class Counter extends Component {
  state = {
    value: this.props.counter.value,
    tags: ["tag1", "tag2", "tag3"]
  };

  // constructor(){
  //     super();
  //     this.handleIncrement=this.handleIncrement.bind(this);

  // }

  rendertags() {
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncrement = () => {
    console.log("Increment clicked", this);
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    console.log("props", this.props);
    const { counter, onDelete, onIncrement } = this.props;
    return (
      <div>
        <span style={{ fontSize: 30 }}>
                    {counter.value}
                  
        </span>
        <button
          onClick={() => onIncrement(counter.id)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => onDelete(counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Counter;
