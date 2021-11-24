import PropTypes from "prop-types";
import React from "react";


class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFilterChange = (event) => {
    // const newValue = this.filterRef.value;
    const newValue = event.target.value;
    this.props.updateFilter(event, newValue);
  };

  /**
 *         ref={el => {
          this.filterRef = el;
        }}
 */
  render() {
    return (
      <input type="search" onInput={this.handleFilterChange} {...this.props} />
    );
  }
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  updateFilter: PropTypes.func,
};

export default Filter;
