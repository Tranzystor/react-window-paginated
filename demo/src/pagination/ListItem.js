import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class ListItem extends PureComponent {
  render() {
    const { data, index, style } = this.props;
    const item = data[index];

    if (item.isFetching) {
      return <div style={style}>fetching</div>;
    }

    if (item.isFailed) {
      return <div style={style}>failed</div>;
    }

    const { selectedId, onClicItem } = this.props;
    const isSelected = item.id === selectedId;

    return (
      <div style={style}>
        {item.id}
        {!isSelected && (
          <button type="button" onClick={() => onClicItem(item.id)}>
            select
          </button>
        )}
        {isSelected && <div>_selected_</div>}
      </div>
    );
  }
}

ListItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number.isRequired,
  selectedId: PropTypes.number.isRequired,
  onClicItem: PropTypes.func.isRequired,
  style: PropTypes.object
};
