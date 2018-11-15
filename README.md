# react-window-paginated

> React HOC component simplifies working with pagination REST API and [react-window](https://react-window.now.sh/) library.

## Install

```bash
# Yarn
yarn add react-window-paginated

# NPM
npm install --save react-window-paginated
```

Run demo:

```bash
cd demo
yarn
yarn start
```

## Demo 

[Go to DEMO](https://tranzystor.github.io/react-window-paginated/)

## Usage

[react-window](https://github.com/bvaughn/react-window) library helps to efficiently render large lists but requires all elements to be fetched. Additionally backend API usually provides data divided into chunks (pages). It's more efficient to fetch only one page of list especially when user has filtering feature available.

`react-window-paginated` wraps `FixedSizeList` component and provides methods: 

* `getPage(pageToFetch: number): Promise` - pageToFetch is a number of necessary page. Response have to be a Promise which returns object: 

```
   {
    itemCount: number, // length of list
    pageElements: Array // requested page elements
   }
```

* `noResultsRenderer(): React.Component` - component which should be rendered when `itemCount` is equal 0. 

`react-window-paginated` stores fetched elements in own state and adds item status to each.

Item status can be: 
* `isFetching`
* `isSuccess`
* `isFailed`

Items with `isFailed` status are refetched if list is scrolled.

## TODO

* add tests
* add styles
* fix propTypes warnings
* fix `Warning: Can't call setState (or forceUpdate) on an unmounted component.`

## License

MIT © [Tranzystor](https://github.com/tranzystor)
