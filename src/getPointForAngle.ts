import rad from "./rad";

export default function getPointForAngle({
  cx,
  cy,
  rx,
  ry,
  phi,
  theta,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  phi: number;
  theta: number;
}) {
  const { abs, sin, cos } = Math;

  const phiRad = rad(phi);
  const thetaRad = rad(theta);

  rx = abs(rx);
  ry = abs(ry);

  const cosPhi = cos(phiRad);
  const sinPhi = sin(phiRad);
  const rxCosTheta = rx * cos(thetaRad);
  const rySinTheta = ry * sin(thetaRad);

  return [
    cx + cosPhi * rxCosTheta - sinPhi * rySinTheta,
    cy + sinPhi * rxCosTheta + cosPhi * rySinTheta,
  ];
}
