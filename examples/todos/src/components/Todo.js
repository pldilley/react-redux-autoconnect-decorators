import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  static propTypes = {
    todoId: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let { todoId, onClick, completed, text } = this.props;

    return (
      <li
        id={todoId}
        onClick={onClick}
        className="listItem"
        style={{
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        {text}
      </li>
    );
  }
}
