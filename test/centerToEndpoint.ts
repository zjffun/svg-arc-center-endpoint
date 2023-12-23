import { expect } from "chai";
import { centerToEndpoint } from "../src/index";

describe("centerToEndpoint", () => {
  it("should work", () => {
    expect(
      centerToEndpoint({
        cx: 100,
        cy: 100,
        rx: 50,
        ry: 50,
        phi: 0,
        theta: 0,
        dTheta: 180,
      }),
    ).is.deep.eq({
      x1: 150,
      y1: 100,
      x2: 50,
      y2: 100,
      fa: 0,
      fs: 1,
    });
  });

  it("zero radii should work", () => {
    expect(
      centerToEndpoint({
        cx: 100,
        cy: 100,
        rx: 0,
        ry: 0,
        phi: 0,
        theta: 0,
        dTheta: 180,
      }),
    ).is.deep.eq({
      x1: 100,
      y1: 100,
      x2: 100,
      y2: 100,
      fa: 0,
      fs: 1,
    });
  });
});
