import { expect } from "chai";
import { endpointToCenter } from "../src/index";

describe("endpointToCenter", () => {
  it("same start and end should work", () => {
    // will have infinite solutions, so return NaN
    expect(
      endpointToCenter({
        rx: 50,
        ry: 50,
        phi: 0,
        x1: 600,
        y1: 400,
        x2: 600,
        y2: 400,
        fa: 0,
        fs: 0,
      }),
    ).is.deep.eq({
      cx: Number.NaN,
      cy: Number.NaN,
      theta: Number.NaN,
      dTheta: Number.NaN,
    });
  });

  it("out of range should work", () => {
    expect(
      endpointToCenter({
        rx: 50,
        ry: 50,
        phi: 0,
        x1: 100,
        y1: 0,
        x2: 100,
        y2: 150,
        fa: 1,
        fs: 1,
      }),
    ).is.deep.eq({
      cx: 100,
      cy: 75,
      theta: -90,
      dTheta: 180,
    });
  });
});
