# react-redux-autoconnect-decorators

Decorators to simplify [react-redux](https://github.com/reactjs/react-redux)'s `connect()`

Inspired and relies upon [react-redux-autoconnect](https://github.com/reactjs/react-redux) by Robert Sargant (simple != stupid ;) )

* Still being worked on *

Example -

Usually to use react-redux connect you'd have to do something like this:
```
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

```

However it can be simplified by using javascript decorators like this:
```
import TodoList from '../components/TodoList';
import { VisibilityFilters, toggleTodo } from '../actions';
import { Autoconnect, State, Dispatch } from "../reduxDecorators";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:       return todos;
    case VisibilityFilters.SHOW_COMPLETED: return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:    return todos.filter(t => !t.completed);
    default: throw new Error('Unknown filter: ' + filter);
  }
};

@Autoconnect()
export default class VisibleTodoList extends TodoList {
  static propTypes = {
    @State( state => getVisibleTodos(state.todos, state.visibilityFilter) )
    todos: TodoList.propTypes.todos,

    @Dispatch(toggleTodo)
    toggleTodo: TodoList.propTypes.toggleTodo
  };
}
```

Please see the following for full examples: https://github.com/pldilley/react-redux-autoconnect-decorators/tree/master/examples/todos/src/containers
