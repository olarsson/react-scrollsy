# react-scrollsy

An ambitious light-weight react module written in TypeScript for tracking scroll progress in a performant way. Developed for use with spring based animation libraries such as react-spring, but can be used with or without any library.

 Badge       | URL
:------------|:---------------------------------------------------------------------------------|
Normal size  | ![](https://img.badgesize.io/olarsson/react-scrollsy/master/dist/react-scrollsy.es.js)
Gzipped size | ![](https://img.badgesize.io/olarsson/react-scrollsy/master/dist/react-scrollsy.es.js?compression=gzip)
Brotli size  | ![](https://img.badgesize.io/olarsson/react-scrollsy/master/dist/react-scrollsy.es.js?compression=brotli)

## Installation

    npm i react-scrollsy

## Usage

Here is a very basic example that tracks the scroll progress of the document.

```js
import { ScrollTrackerDocument, ScrollTracker } from "react-scrollsy";

import {
  IScrollData,
  IScrollObject,
} from "react-scrollsy/dist/types";

import { useRef } from "react";

function App() {
  const refPageProgress = useRef(null);

  return (
    <ScrollTrackerDocument resizeThrottle={150}>
      {({ scrollData }: IScrollData) => {
        return (
          <ScrollTracker
            scrollData={scrollData}
            elem={refPageProgress}
            settings={{
              duration: {
                distance: 100,
                unit: "%",
                basedOn: "doc",
              },
            }}>
            {({ scrollObject }: IScrollObject) => {
              return (
                <h1 ref={refPageProgress}>
                  Here is the scroll progress: {scrollObject.progress}
                </h1>
              );
            }}
          </ScrollTracker>
        );
      }}
    </ScrollTrackerDocument>
  );
}

export default App;
```

## Components

### `<ScrollTrackerDocument />`

Sets the document as the main scrolling container.
This or ScrollTrackerCustom must always be the parent of a ScrollTracker component.

Configuration and properties:

- `resizeThrottle` - (number, required) throttles the recalculations in ms to this value when the document is resized.

Creates a function which returns a `scrollData` object as such:

- `scrollData` - (object, immutable) data returned from the component.
  - `scrollTop` - (number, px) the scroll position from the top.
  - `containerHeight` - (number, px) height of the container.
  - `element` - (number, px) the tracked element for scrolling (document).
  - `percentProgress` - (number, %) scroll progress in percent expressed as a number between 0 to 1.
  - `scrollHeight` - (number, px) the total scrollable height of the document.

### `<ScrollTrackerCustom />`

Sets a custom element as the main scrolling container.
This or ScrollTrackerDocument must always be the parent of a ScrollTracker component.

Configuration and properties:

- `resizeThrottle` - (number, required) throttles the recalculations to this value in ms when the document is resized.
- `scrollingElement` - (string, required) the selector for the main scrollable element to track scroll progress of.

Creates a function which returns a `scrollData` object as such:

- `scrollData` - (object, immutable) data returned from the component.
  - `scrollTop` - (number, px) the scroll position from the top.
  - `containerHeight` - (number, px) height of the container.
  - `element` - (number, px) the tracked element for scrolling (custom element).
  - `percentProgress` - (number, %) scroll progress in percent expressed as a number between 0 to 1.
  - `scrollHeight` - (number, px) the total scrollable height of the document.

### `<ScrollTracker />`

A specific DOM element and its progress based on its duration and offsets will be managed by this component.

Configuration and properties:

- `elem` - (ref, required) sets the element reference to use when tracking scroll progress.
- `settings` - (object, required)
  - `duration` - (object, required)
    - `distance` - (number, required) how long of the tracked elements duration calculations should be active for.
    - `unit` - (['px' | '%'], required) unit the distance should be measured in.
    - `basedOn` - (['doc' | 'elem' | 'vp'], required) the duration will be calculated based on distance + unit and what you chose here. 'doc' is the document, 'elem' is the element, 'vp' is the viewport height.
  - `offsetTop` - (object, optional)
    - `...` - same props as the duration.
  - `offsetBottom` - (object, optional)
    - `...` - same props as the duration.
- `onStart` - (function, optional) callback to run when scroll progress begins.
- `onEnd` - (function, optional) callback to run when scroll progress ends.

Creates a function which returns a `scrollObject` object as such:

- `scrollObject` (object, immutable) - data returned from the component.
  - `scrollData` - (object, immutable) inherited from the main component.
  - `progress` - (number, %) scroll progress in percent expressed as a number between 0 to 1.
  - `start` - (number, px) the start position in pixels when scroll progress calculation should begin.
  - `end` - (number, px) the end position in pixels when scroll progress calculation should end.
