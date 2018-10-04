import React, {Component} from 'react';
import FilterLink from '../containers/FilterLink';
import {VisibilityFilters} from '../actions';

export default class Footer extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <span>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
          All
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
          Active
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
          Completed
        </FilterLink>
      </div>
    );
  }
}
