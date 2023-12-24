[![jsdelivr][jsdelivr-badge]][jsdelivr-link]
[![npm version][fury-badge]][fury-link]
[![codecov][codecov-badge]][codecov-link]

# [svg-arc-center-endpoint](https://zjffun.github.io/svg-arc-center-endpoint/)

> An Implementation of https://www.w3.org/TR/SVG/implnote.html#ArcConversionCenterToEndpoint

Conversion SVG arcs from center to endpoint parameterization, and vice versa.

## Installation

```sh
npm install svg-arc-center-endpoint
```

## Usage

ESM:

```js
import { centerToEndpoint } from "svg-arc-center-endpoint";

const rx = 50;
const ry = 50;
const xAxisRotation = 0;

const {
  x1,
  x2,
  y1,
  y2,
  fa: largeArcFlag,
  fs: sweepFlag,
} = centerToEndpoint({
  cx: 100,
  cy: 100,
  rx,
  ry,
  phi: xAxisRotation,
  theta: 30,
  dTheta: 60,
});

const x1Fixed = x1.toFixed(3);
const y1Fixed = y1.toFixed(3);
const x2Fixed = x2.toFixed(3);
const y2Fixed = y2.toFixed(3);

const path = `M ${x1Fixed} ${y1Fixed} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x2Fixed} ${y2Fixed}`;

console.log(path); // M 143.301 125.000 A 50 50 0 0 1 100.000 150.000
```

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/svg-arc-center-endpoint@0.0.1"></script>
<script>
  const { centerToEndpoint } = svgArcCenterEndpoint;

  const rx = 50;
  const ry = 50;
  const xAxisRotation = 0;
  const theta = 30;
  const dTheta = 60;

  const {
    x1,
    x2,
    y1,
    y2,
    fa: largeArcFlag,
    fs: sweepFlag,
  } = centerToEndpoint({
    cx: 100,
    cy: 100,
    rx,
    ry,
    phi: xAxisRotation,
    theta,
    dTheta,
  });

  const x1Fixed = x1.toFixed(3);
  const y1Fixed = y1.toFixed(3);
  const x2Fixed = x2.toFixed(3);
  const y2Fixed = y2.toFixed(3);

  const path = `M ${x1Fixed} ${y1Fixed} A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x2Fixed} ${y2Fixed}`;

  console.log(path); // M 143.301 125.000 A 50 50 0 0 1 100.000 150.000
</script>
```

## API

### `centerToEndpoint({cx, cy, rx, ry, phi, theta, dTheta})`

The `centerToEndpoint()` method convert the given center parameterization to endpoint parameterization.

#### Parameters

- `cx` (`number`) - The x-axis coordinate of the center of the ellipse.
- `cy` (`number`) - The y-axis coordinate of the center of the ellipse.
- `rx` (`number`) - The x-axis radius of the ellipse.
- `ry` (`number`) - The y-axis radius of the ellipse.
- `phi` (`number`) - The x-axis rotation of the ellipse.
- `theta` (`number`) - The start angle of the arc. In degrees, range: `(-360, 360)`.
- `dTheta` (`number`) - The angular distance from the start angle to the end angle. In degrees, range: `(-360, 360)`.

#### Returns

- `x1` (`number`) - The x-axis coordinate of the start point of the arc.
- `y1` (`number`) - The y-axis coordinate of the start point of the arc.
- `x2` (`number`) - The x-axis coordinate of the end point of the arc.
- `y2` (`number`) - The y-axis coordinate of the end point of the arc.
- `fa` (`number`) - The large arc flag. (0 or 1)
- `fs` (`number`) - The sweep flag. (0 or 1)

### `endpointToCenter()`

The `endpointToCenter()` method convert the given endpoint parameterization to center parameterization.

### `getPointForAngle()`

The `getPointForAngle()` method returns the point (`x,y`) on the ellipse for the given angle (`theta`).

## Reference

- [Implementation Notes — SVG 2](https://www.w3.org/TR/SVG/implnote.html)
- [Ellipse and elliptical arc conversion / Torben Jansen | Observable](https://observablehq.com/@toja/ellipse-and-elliptical-arc-conversion)

## [Release Notes](./CHANGELOG.md)

<!-- Definitions -->

[svg-arc-center-endpoint]: https://zjffun.github.io/svg-arc-center-endpoint/
[fury-link]: https://badge.fury.io/js/svg-arc-center-endpoint
[fury-badge]: https://badge.fury.io/js/svg-arc-center-endpoint.svg
[jsdelivr-link]: https://www.jsdelivr.com/package/npm/svg-arc-center-endpoint
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/svg-arc-center-endpoint/badge
[codecov-badge]: https://codecov.io/gh/zjffun/svg-arc-center-endpoint/branch/main/graph/badge.svg
[codecov-link]: https://codecov.io/gh/zjffun/svg-arc-center-endpoint
