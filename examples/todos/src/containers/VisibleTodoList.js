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
