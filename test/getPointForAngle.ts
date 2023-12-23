import { expect } from "chai";
import { getPointForAngle } from "../src/index";

describe("getPointForAngle", () => {
  it("should work", () => {
    expect(
      getPointForAngle({
        cx: 100,
        cy: 100,
        rx: 50,
        ry: 50,
        phi: 0,
        theta: 0,
      }),
    ).is.deep.eq([150, 100]);
  });

  it("zero radii should work", () => {
    expect(
      getPointForAngle({
        cx: 100,
        cy: 100,
        rx: 0,
        ry: 0,
        phi: 0,
        theta: 0,
      }),
    ).is.deep.eq([100, 100]);
  });
});
