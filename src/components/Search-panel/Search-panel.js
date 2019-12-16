import React, {Component} from 'react';

import './Search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: ''
  };

  onSearchChange = (ev) => {
    const term = ev.target.value;

    this.setState({term});
    this.props.onSearchChange(term)
  };

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             value={this.state.term}
             onChange={this.onSearchChange}
      />
    );
  };
}
