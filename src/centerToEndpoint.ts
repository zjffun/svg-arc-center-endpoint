import getPointForAngle from "./getPointForAngle";

export default function getEndpointParameters({
  cx,
  cy,
  rx,
  ry,
  phi,
  theta,
  dTheta,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  phi: number;
  theta: number;
  dTheta: number;
}) {
  const { abs } = Math;
  const [x1, y1] = getPointForAngle({ cx, cy, rx, ry, phi, theta });
  const [x2, y2] = getPointForAngle({
    cx,
    cy,
    rx,
    ry,
    phi,
    theta: theta + dTheta,
  });

  const fa = abs(dTheta) > 180 ? 1 : 0;
  const fs = dTheta > 0 ? 1 : 0;

  return { x1, y1, x2, y2, fa, fs };
}
