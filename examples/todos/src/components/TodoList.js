import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toggleTodo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  renderTodos = (todos) => todos.map(
    todo => <Todo
              key={todo.id}
              todoId={todo.id}
              {...todo}
              onClick={this.onToggleTodo}
            />
  );

  render() {
    let { todos } = this.props;

    return (
      <ul>
        { this.renderTodos(todos) }
      </ul>
    );
  }

  onToggleTodo = (e) => {
    let { toggleTodo } = this.props;
    let { id } = e.target;

    return toggleTodo(id);
  };
}
