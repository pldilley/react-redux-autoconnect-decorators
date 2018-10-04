import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Link extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let { active, children, onClick } = this.props;

    return (
      <button
        onClick={onClick}
        disabled={active}
        style={{
          marginLeft: '4px',
        }}
      >
        {children}
      </button>
    );
  }
}
