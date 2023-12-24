import deg from "./deg";

function safeAcos(x: number) {
  if (x < -1) return Math.PI;
  if (x > 1) return 0;
  return Math.acos(x);
}

function sqrtAbs(x: number) {
  return Math.sqrt(Math.abs(x));
}

function vectorAngle([ux, uy], [vx, vy]) {
  const sign = ux * vy - uy * vx < 0 ? -1 : 1;
  const ua = sqrtAbs(ux * ux + uy * uy);
  const va = sqrtAbs(vx * vx + vy * vy);
  const dot = ux * vx + uy * vy;

  return sign * safeAcos(dot / (ua * va));
}

export default function endpointToCenter({
  x1,
  y1,
  x2,
  y2,
  fa,
  fs,
  rx,
  ry,
  phi,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fa: number;
  fs: number;
  rx: number;
  ry: number;
  phi: number;
}) {
  const { abs, sin, cos, pow } = Math;

  const sinPhi = sin(phi);
  const cosPhi = cos(phi);

  // Step 1: simplify through translation/rotation
  const x1_ = (cosPhi * (x1 - x2)) / 2 + (sinPhi * (y1 - y2)) / 2;
  const y1_ = (-sinPhi * (x1 - x2)) / 2 + (cosPhi * (y1 - y2)) / 2;

  const x1_p2 = pow(x1_, 2);
  const y1_p2 = pow(y1_, 2);

  // B.2.5. Correction of out-of-range radii
  {
    // Step 1: Ensure radii are non-zero
    if (rx === 0 || ry === 0) {
      return { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, theta: 0, dTheta: 0 };
    }

    // Step 2: Ensure radii are positive
    rx = abs(rx);
    ry = abs(ry);

    // Step 3: Ensure radii are large enough
    const L = x1_p2 / pow(rx, 2) + y1_p2 / pow(ry, 2);

    if (L > 1) {
      rx = sqrtAbs(L) * rx;
      ry = sqrtAbs(L) * ry;
    }
  }

  // Step 2 + 3: compute center
  const rxp2 = pow(rx, 2);
  const ryp2 = pow(ry, 2);

  const sign = fa === fs ? -1 : 1;

  /**
   * `pow(sqrt(L) * rx, 2)` will less than `L * pow(rx, 2)` when we run B.2.5. Correction of out-of-range radii
   * so below value will be negative, we need use abs to fix it
   */
  const M =
    sqrtAbs(
      (rxp2 * ryp2 - rxp2 * y1_p2 - ryp2 * x1_p2) /
        (rxp2 * y1_p2 + ryp2 * x1_p2),
    ) * sign;

  const cx_ = (M * (rx * y1_)) / ry;
  const cy_ = (M * (-ry * x1_)) / rx;

  const cx = cosPhi * cx_ - sinPhi * cy_ + (x1 + x2) / 2;
  const cy = sinPhi * cx_ + cosPhi * cy_ + (y1 + y2) / 2;

  // Step 4: compute θ and dθ
  const theta = deg(vectorAngle([1, 0], [(x1_ - cx_) / rx, (y1_ - cy_) / ry]));

  let dTheta =
    deg(
      vectorAngle(
        [(x1_ - cx_) / rx, (y1_ - cy_) / ry],
        [(-x1_ - cx_) / rx, (-y1_ - cy_) / ry],
      ),
    ) % 360;

  if (fs === 0 && dTheta > 0) dTheta -= 360;
  if (fs === 1 && dTheta < 0) dTheta += 360;

  return { cx, cy, theta, dTheta };
}
