import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';
import { Autoconnect, DispatchWithProps, StateWithProps } from "../reduxDecorators";

@Autoconnect()
export default class FilterLink extends Link {

  static propTypes = {
    children: Link.propTypes.children,

    @StateWithProps( (ownProps, state) => ownProps.filter === state.visibilityFilter )
    active: Link.propTypes.active,

    @DispatchWithProps( (ownProps) => setVisibilityFilter(ownProps.filter) )
    onClick: Link.propTypes.onClick,
  };
}
