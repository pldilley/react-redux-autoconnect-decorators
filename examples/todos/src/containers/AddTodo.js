import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Autoconnect, Dispatch } from "../reduxDecorators";
import { addTodo } from '../actions';

@Autoconnect()
export default class AddTodo extends Component {
  static propTypes = {
    @Dispatch(addTodo)
    doAddTodo: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  };

  render() {
    let { value } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={value} />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }

  onChange = (e) => {
    let { value } = e.target;

    this.setState({ value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let { doAddTodo } = this.props;
    let { value } = this.state;
    if (!value.trim()) return;

    doAddTodo(value);

    this.setState({
      value: ''
    });
  };
}
