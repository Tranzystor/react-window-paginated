import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";
import paginate from "react-window-paginated";
import ListItem from "./ListItem";
import getPage from "./endpointStub";

const ELEMENTS_PER_PAGE = 20;

const PaginatedList = paginate(List);
const fetchPage = getPage(ELEMENTS_PER_PAGE);

export default class PaginationDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      inputValue: ""
    };
  }

  onClicItem = selectedId =>
    this.setState({
      selectedId
    });

  getPage = pageToFetch => {
    const { inputValue } = this.state;
    return fetchPage(inputValue, pageToFetch);
  };

  noResultsRenderer = () => <div>no results found.</div>;

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const { inputValue, selectedId } = this.state;
    return (
      <div>
        <input
          value={inputValue}
          onChange={evt => this.updateInputValue(evt)}
          placeholder="search..."
          style={{ margin: "10px" }}
        />
        <PaginatedList
          className="List"
          height={300}
          itemSize={35}
          width={300}
          getPage={this.getPage}
          elementsPerPage={ELEMENTS_PER_PAGE}
          key={inputValue}
          noResultsRenderer={this.noResultsRenderer}
        >
          {argz => (
            <ListItem
              onClicItem={this.onClicItem}
              selectedId={selectedId}
              {...argz}
            />
          )}
        </PaginatedList>
      </div>
    );
  }
}
