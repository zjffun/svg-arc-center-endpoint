import { expect } from "chai";
import { endpointToCenter } from "../src/index";

describe("endpointToCenter", () => {
  it("cx and cy should not NaN", () => {
    /**
     * M will be NaN case, using abs() fixed it
     *
     * Original code:
     * const M =
     *   sqrt(
     *     (rxp2 * ryp2 - rxp2 * y1_p2 - ryp2 * x1_p2) /
     *       (rxp2 * y1_p2 + ryp2 * x1_p2),
     *   ) * sign;
     */
    const center = endpointToCenter({
      rx: 50,
      ry: 50,
      phi: 0,
      x1: 343,
      y1: 239,
      x2: 468,
      y2: 250,
      fa: 0,
      fs: 1,
    });
    expect(center.cx).is.not.NaN;
    expect(center.cy).is.not.NaN;
  });

  it("dTheta should not NaN", () => {
    /**
     * vectorAngle will be NaN, limit the value to [-1, 1] fixed it
     *
     * Original code:
     * return sign * acos(dot / (ua * va));
     */
    const center = endpointToCenter({
      rx: 50,
      ry: 50,
      phi: 0,
      x1: 340,
      y1: 225,
      x2: 61,
      y2: 250,
      fa: 0,
      fs: 1,
    });
    expect(center.dTheta).is.not.NaN;
  });

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
