# react-scrollsy v1.1.5 ![](https://img.badgesize.io/olarsson/react-scrollsy/master/dist/react-scrollsy.es.js)

An ambitious light-weight react module written in TypeScript for tracking scroll progress in a performant way. Developed for use with spring based animation libraries such as react-spring, but can be used with or without any library.

## Live demo / Code examples

Live demo: https://olarsson.github.io/react-scrollsy-examples/

Code examples: https://github.com/olarsson/react-scrollsy-examples/tree/master/src

## Repository

URL: https://github.com/olarsson/react-scrollsy

## Installation

    npm i react-scrollsy

## Usage

Here is a very basic example that tracks the scroll progress of the document.

```js
import { ScrollTrackerDocument, ScrollTracker } from "react-scrollsy";

import { IScrollData, IScrollObject } from "react-scrollsy/dist/types";

import { useRef } from "react";

function App() {
  const refPageProgress = useRef(null);

  return (
    <ScrollTrackerDocument scrollThrottle={33}> // 1000 ms/30 fps = 33ms, limits the triggered events to 30 fps, optional
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
              return <h1 ref={refPageProgress}>Here is the scroll progress: {scrollObject.progress}</h1>;
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

- `scrollThrottle` - (number) throttles the recalculations in ms to this value when the document is scrolled.
- `resizeThrottle` - (number) throttles the recalculations in ms to this value when the document is resized.

Creates a function which returns a `scrollData` object as such:

- `scrollData` - (object, immutable) data returned from the component.
  - `scrollTop` - (number, px) the scroll position from the top.
  - `containerHeight` - (number, px) height of the container.
  - `element` - (number, px) the tracked element for scrolling (document).
  - `percentProgress` - (number, %) scroll progress in percent expressed as a number between 0 to 1.
  - `scrollHeight` - (number, px) the total scrollable height of the document.

```js
<ScrollTrackerDocument>
  {({ scrollData }: IScrollData) => {
    return (
      // ScrollTracker components and other components can go inside here
    );
  }}
</ScrollTrackerDocument>
```

### `<ScrollTrackerCustom />`

Sets a custom element as the main scrolling container.
This or ScrollTrackerDocument must always be the parent of a ScrollTracker component.

Configuration and properties:

- `scrollThrottle` - (number) throttles the recalculations to this value in ms when the element is scrolled.
- `resizeThrottle` - (number) throttles the recalculations to this value in ms when the element is resized.
- `scrollingElement` - (string, required) the selector for the main scrollable element to track scroll progress of.

Creates a function which returns a `scrollData` object as such:

- `scrollData` - (object, immutable) data returned from the component.
  - `scrollTop` - (number, px) the scroll position from the top.
  - `containerHeight` - (number, px) height of the container.
  - `element` - (number, px) the tracked element for scrolling (custom element).
  - `percentProgress` - (number, %) scroll progress in percent expressed as a number between 0 to 1.
  - `scrollHeight` - (number, px) the total scrollable height of the document.

```js
<ScrollTrackerCustom
  key={active.toString()} // forces a rerender of the tracker, use this if you for example hide the element with 'display: none'
  scrollingElement='#custom-scroll-container'>
  {({ scrollData }: IScrollData) => {
    return (
      // ScrollTracker components and other components can go inside here
    );
  }}
</ScrollTrackerCustom>
```

### `<ScrollTracker />`

A specific DOM element and its progress based on its duration and offsets will be managed by this component.

Configuration and properties:

- `elem` - (ref, required) sets the element reference to use when tracking scroll progress.
- `settings` - (object, required)
  - `trigger` - (['onEnter' | 'onLeave'], optional) when the calculations should be begin, defaults to 'onEnter'. is only used when 'basedOn' is set to 'elem' or 'vp'. 'onEnter' means the trigger is when the element enters the vp, 'onLeave' is when the element start to leave the vp.
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

```js
<ScrollTracker
  scrollData={scrollData} // the scrollData object returned by either ScrollTrackerDocument or ScrollTrackerCustom
  elem={refElem}
  settings={{
    trigger: 'onLeave',
    duration: {
      distance: 100,
      unit: "%",
      basedOn: "elem",
    },
    offsetTop: {
      distance: 25,
      unit: "%",
      basedOn: "vp",
    },
    offsetBottom: {
      distance: -200,
      unit: "px",
      basedOn: "", // when using px this can be left empty
    },
  }}>
  {({ scrollObject }: IScrollObject) => {
    return (
      // return for example the scrollObject.progress to reflect progress, and any other elements/components that you wish
    )
  }}
</ScrollTracker>
```

### Next.js
If you load react-scrollsy as a dynamic component it will work out of the box, if you want it to work with SSR then you need to change your next config accordingly:
```js
const nextConfig = {
  transpilePackages: ['react-scrollsy']
};
```
If it still doesnt work then change the import string in the following fashion:
`import { ScrollTrackerDocument, ScrollTracker } from "node_modules/react-scrollsy/dist/react-scrollsy.es";`


### Whats new

##### Version 1.1.5
- [x] Updated the readme with use examples for Next.js

##### Version 1.1.4
- [x] Added server side rendering for use with Next.js and such

##### Version 1.1.3
- [x] Bugfix, incorrect height calculation after adding triggers

##### Version 1.1.2
- [x] Triggers added, onEnter/onLeave
- [x] Examples update with the use of triggers

##### Version 1.1.1
- [x] Readme repo url added
- [x] package.json repo url added

##### Version 1.1
- [x] You can now throttle the scrolling events
- [x] resizeThrottle is no longer required

##### Version 1.0
- [x] Initial release

### Todo

- [ ] Implement the scroll logic for horizontal scrolling
- [ ] Write (more) tests
- [ ] Refactor the ScrollTrackerCustom?
