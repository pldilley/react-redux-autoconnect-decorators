import {Component} from "react";

export default class AddTodo extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  };

  render() {
    return (

    );
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState({ value });
  };
}
