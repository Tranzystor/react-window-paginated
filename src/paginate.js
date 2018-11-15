import React from "react";

const failedState = {
  isFetching: false,
  isFailed: true,
  isSuccess: false
};

const successState = {
  isFetching: false,
  isFailed: false,
  isSuccess: true
};

const fetchingState = {
  isFetching: true,
  isFailed: false,
  isSuccess: false
};

const paginate = WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        itemCount: 0
      };
    }

    getPageToFetch = ({ overscanStartIndex, overscanStopIndex }) => {
      const { items } = this.state;
      const { elementsPerPage } = this.props;
      for (let i = overscanStartIndex; i < overscanStopIndex; i += 1) {
        if (!items[i] || (items[i] && items[i].isFailed)) {
          return Math.floor(i / elementsPerPage);
        }
      }
      return null;
    };

    setPageStatus = (pageNumber, itemState) => {
      const { items } = this.state;
      const { elementsPerPage } = this.props;

      const newItems = items.concat();
      const start = pageNumber * elementsPerPage;
      const end = start + elementsPerPage;

      for (let i = start; i < end; i += 1) {
        const item = items[i];
        newItems[i] = {
          ...item,
          ...itemState
        };
      }
      this.setState({
        items: newItems
      });
    };

    pushPageToLocalState = (pageNumber, response) => {
      this.setState(prevState => {
        const itemsCopy =
          response.itemCount === prevState.itemCount
            ? prevState.items.concat()
            : [];

        const { elementsPerPage } = this.props;
        const offset = elementsPerPage * pageNumber;
        response.pageElements.forEach((x, i) => {
          itemsCopy[i + offset] = {
            ...x,
            ...successState
          };
        });
        return {
          items: itemsCopy,
          itemCount: response.itemCount
        };
      });
    };

    onItemsRendered = argz => {
      const pageToFetch = this.getPageToFetch(argz);

      if (typeof pageToFetch === "number") {
        this.setPageStatus(pageToFetch, fetchingState);
        const { getPage } = this.props;

        getPage(pageToFetch)
          .then(response => {
            this.pushPageToLocalState(pageToFetch, response);
          })
          .catch(() => {
            this.setPageStatus(pageToFetch, failedState);
          });
      }
    };

    componentDidMount = () => {
      const pageToFetch = 0;
      const { elementsPerPage, getPage } = this.props;
      this.setPageStatus(pageToFetch, fetchingState);
      this.setState({
        itemCount: elementsPerPage
      });
      getPage(pageToFetch)
        .then(response => this.pushPageToLocalState(pageToFetch, response))
        .catch(() => this.setPageStatus(pageToFetch, failedState));
    };

    render() {
      const { items, itemCount } = this.state;
      const { noResultsRenderer, children } = this.props;

      if (itemCount === 0) {
        return noResultsRenderer();
      }

      return (
        <WrappedComponent
          onItemsRendered={this.onItemsRendered}
          itemData={items}
          itemCount={itemCount}
          {...this.props}
        >
          {argz => {
            const { data, index } = argz;
            const item = data[index];

            if (!item) {
              return <React.Fragment />;
            }

            return children(argz);
          }}
        </WrappedComponent>
      );
    }
  };

export default paginate;
