(function () {
  'use strict';

  function dkDecorate(element) {
    if (!element || element.__dkDecorated) return element;
    Object.defineProperty(element, '__dkDecorated', { value: true });
    element.createEl = function (tagName, options) {
      const child = document.createElement(tagName);
      const settings = options || {};
      if (settings.cls) child.className = settings.cls;
      if (settings.text !== undefined) child.textContent = settings.text;
      if (settings.attr) {
        Object.entries(settings.attr).forEach(([name, value]) => child.setAttribute(name, String(value)));
      }
      this.appendChild(child);
      return dkDecorate(child);
    };
    element.createDiv = function (options) { return this.createEl('div', options); };
    element.createSpan = function (options) { return this.createEl('span', options); };
    element.appendText = function (text) {
      this.appendChild(document.createTextNode(text));
      return this;
    };
    return element;
  }

function initKagomeHero() {
  const hero = dkDecorate(document.getElementById('dk-kagome-hero'));
  if (!hero) return;
const heroNS = "http://www.w3.org/2000/svg";
const heroSvg = document.createElementNS(heroNS, "svg");
heroSvg.setAttribute("viewBox", "0 0 760 420");
heroSvg.setAttribute("role", "img");
heroSvg.setAttribute("aria-label", "Unlabeled five by seven deformed Kagome metamaterial");
hero.appendChild(heroSvg);

const heroA = 0.72;
const heroB = 0.57;
const heroTheta = 1.60;
const heroAlpha = Math.acos((heroA * heroA + 1 - heroB * heroB) / (2 * heroA));
const hAdd = (p, q) => [p[0] + q[0], p[1] + q[1]];
const hSub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const hMul = (s, p) => [s * p[0], s * p[1]];

let hO = [0, 0];
let hR = [heroA * Math.cos(heroTheta), heroA * Math.sin(heroTheta)];
let hS = [Math.cos(heroTheta + heroAlpha), Math.sin(heroTheta + heroAlpha)];
let hP = [1, 0];
let hQ = [0.5, -Math.sqrt(3) / 2];
let hv1 = hAdd(hSub(hR, hS), hSub(hP, hQ));
let hv2 = hSub(hR, hQ);
const hRotation = Math.atan2(hv1[1], hv1[0]);
const hRotate = p => [
  Math.cos(hRotation) * p[0] + Math.sin(hRotation) * p[1],
  -Math.sin(hRotation) * p[0] + Math.cos(hRotation) * p[1]
];
hO = hRotate(hO);
hR = hRotate(hR);
hS = hRotate(hS);
hP = hRotate(hP);
hQ = hRotate(hQ);
hv1 = hRotate(hv1);
hv2 = hRotate(hv2);

const heroCells = [];
const heroPoints = [];
for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) {
  const shift = hAdd(hMul(i, hv1), hMul(j, hv2));
  const cell = {
    O: hAdd(hO, shift),
    R: hAdd(hR, shift),
    S: hAdd(hS, shift),
    P: hAdd(hP, shift),
    Q: hAdd(hQ, shift)
  };
  heroCells.push(cell);
  heroPoints.push(cell.O, cell.R, cell.S, cell.P, cell.Q);
}

const heroXs = heroPoints.map(p => p[0]);
const heroYs = heroPoints.map(p => p[1]);
const heroMinX = Math.min(...heroXs);
const heroMaxX = Math.max(...heroXs);
const heroMinY = Math.min(...heroYs);
const heroMaxY = Math.max(...heroYs);
const heroScale = Math.min(704 / (heroMaxX - heroMinX), 364 / (heroMaxY - heroMinY));
const heroLeft = (760 - (heroMaxX - heroMinX) * heroScale) / 2;
const heroTop = (420 - (heroMaxY - heroMinY) * heroScale) / 2;
const heroMap = p => [
  heroLeft + (p[0] - heroMinX) * heroScale,
  heroTop + (heroMaxY - p[1]) * heroScale
];
const heroPath = points => points.map((p, index) => {
  const q = heroMap(p);
  return (index ? "L" : "M") + q[0].toFixed(2) + "," + q[1].toFixed(2);
}).join(" ") + " Z";
const heroTriangle = (points, cls) => {
  const shape = document.createElementNS(heroNS, "path");
  shape.setAttribute("d", heroPath(points));
  shape.setAttribute("class", cls);
  heroSvg.appendChild(shape);
};
heroCells.forEach(cell => {
  heroTriangle([cell.O, cell.R, cell.S], "dkh-top");
  heroTriangle([cell.O, cell.P, cell.Q], "dkh-bottom");
});
}

function initKagomeInteractive() {
  const root = dkDecorate(document.getElementById('dk-kagome-interactive'));
  if (!root) return;
const head = root.createDiv({ cls: "dk-head" });
head.createDiv({ cls: "dk-title", text: "Two-triangle basis" });

function addRangeControl(container, symbol, min, max, value, ariaLabel) {
  const row = container.createDiv({ cls: "dk-control-row" });
  row.createSpan({ cls: "dk-control-name", text: symbol });
  const minOut = row.createSpan();
  const input = row.createEl("input");
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = "0.01";
  input.value = String(value);
  input.setAttribute("aria-label", ariaLabel);
  const maxOut = row.createSpan();
  const valueOut = row.createSpan({ cls: "dk-control-value" });
  return { input, minOut, maxOut, valueOut };
}

function panel(parent, title, ariaLabel, extraClass = "") {
  const box = parent.createDiv({ cls: `dk-panel ${extraClass}` });
  box.createDiv({ cls: "dk-label", text: title });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", ariaLabel);
  box.appendChild(svg);
  return svg;
}

const shapeControls = root.createDiv({ cls: "dk-controls dk-shape-controls" });
shapeControls.createDiv({ cls: "dk-control-heading", text: "Choose the scalene triangle for Figure A" });
const aControl = addRangeControl(shapeControls, "a", 0.20, 1.80, 0.72, "Side length a");
const bControl = addRangeControl(shapeControls, "b", 0.29, 1.71, 0.57, "Side length b");

const basisSvg = panel(
  root,
  "A · Exact two-triangle basis",
  "An equilateral and scalene triangle sharing a hinge",
  "dk-basis-panel"
);

const mechanismHeader = root.createDiv({ cls: "dk-control-header dk-mechanism-header" });
mechanismHeader.createSpan({ cls: "dk-title", text: "One-parameter family of mechanism marked by θ" });

const thetaControls = root.createDiv({ cls: "dk-controls dk-theta-controls" });
const thetaControl = addRangeControl(thetaControls, "θ", 0.55, 3.95, 1.60, "Bond angle theta in radians");
const thetaRow = root.createDiv({ cls: "dk-theta-row" });
const thetaOut = thetaRow.createSpan({ cls: "dk-theta" });

const tileSvg = panel(
  root,
  "B · Deformed Kagome tile",
  "A three by three periodic tile with lattice vectors",
  "dk-tile-panel"
);

const slider = thetaControl.input;
const aSlider = aControl.input;
const bSlider = bControl.input;
const basisTheta = 1.60;

const readout = root.createDiv({ cls: "dk-readout" });
const geometryOut = readout.createSpan();
const areaOut = readout.createSpan({ cls: "dk-area" });
areaOut.appendText("Area of the unit cell = |det A(θ)| = ");
const areaNumber = areaOut.createSpan();
const typeOut = readout.createSpan({ cls: "dk-type" });

const NS = "http://www.w3.org/2000/svg";

function parameters() {
  const a = Number(aSlider.value);
  const b = Number(bSlider.value);
  const cosine = (a * a + 1 - b * b) / (2 * a);
  const alpha = Math.acos(Math.max(-1, Math.min(1, cosine)));
  return { a, b, alpha };
}

function el(parent, name, attrs = {}, text = null) {
  const node = document.createElementNS(NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (text !== null) node.textContent = text;
  parent.appendChild(node);
  return node;
}
const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const mul = (s, p) => [s * p[0], s * p[1]];

function geometry(theta, alignLattice = false) {
  const { a, b, alpha } = parameters();
  const O = [0, 0];
  const R = [a * Math.cos(theta), a * Math.sin(theta)];
  const S = [Math.cos(theta + alpha), Math.sin(theta + alpha)];
  const P = [1, 0];
  const Q = [0.5, -Math.sqrt(3) / 2];
  let v1 = add(sub(R, S), sub(P, Q));
  let v2 = sub(R, Q);
  let points = { O, R, S, P, Q };
  if (alignLattice) {
    const angle = Math.atan2(v1[1], v1[0]);
    const rotate = p => [
      Math.cos(angle) * p[0] + Math.sin(angle) * p[1],
      -Math.sin(angle) * p[0] + Math.cos(angle) * p[1]
    ];
    points = Object.fromEntries(Object.entries(points).map(([key, p]) => [key, rotate(p)]));
    v1 = rotate(v1);
    v2 = rotate(v2);
  }
  return { ...points, v1, v2, a, b, alpha };
}

function mapper(bounds, width, height, padding) {
  const dx = Math.max(bounds.maxX - bounds.minX, 0.1);
  const dy = Math.max(bounds.maxY - bounds.minY, 0.1);
  const scale = Math.min((width - 2 * padding) / dx, (height - 2 * padding) / dy);
  const left = (width - dx * scale) / 2;
  const top = (height - dy * scale) / 2;
  return p => [left + (p[0] - bounds.minX) * scale, top + (bounds.maxY - p[1]) * scale];
}

function boundsOf(points) {
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

function path(points, map) {
  return points.map((p, index) => {
    const q = map(p);
    return `${index ? "L" : "M"}${q[0].toFixed(2)},${q[1].toFixed(2)}`;
  }).join(" ") + " Z";
}

function label(svg, text, p, map, cls = "", anchor = "middle") {
  const q = map(p);
  return el(svg, "text", { x: q[0], y: q[1], class: cls, "text-anchor": anchor, "dominant-baseline": "middle" }, text);
}

function edgeLabel(svg, text, p, q, centroid, map) {
  const p0 = map(p), q0 = map(q), c0 = map(centroid);
  const mid = [(p0[0] + q0[0]) / 2, (p0[1] + q0[1]) / 2];
  const outward = [mid[0] - c0[0], mid[1] - c0[1]];
  const n = Math.hypot(...outward) || 1;
  return el(svg, "text", {
    x: mid[0] + 11 * outward[0] / n,
    y: mid[1] + 11 * outward[1] / n,
    class: "dk-edge", "text-anchor": "middle", "dominant-baseline": "middle"
  }, text);
}

function arc(svg, start, finish, radius, map, cls, center = [0, 0]) {
  const count = Math.max(3, Math.ceil(Math.abs(finish - start) * 28));
  const points = Array.from({ length: count + 1 }, (_, i) => {
    const angle = start + (finish - start) * i / count;
    return [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle)
    ];
  });
  const d = points.map((p, index) => {
    const q = map(p);
    return `${index ? "L" : "M"}${q[0].toFixed(2)},${q[1].toFixed(2)}`;
  }).join(" ");
  el(svg, "path", { d, class: cls });
}

function drawBasis(theta) {
  basisSvg.replaceChildren();
  basisSvg.setAttribute("viewBox", "0 0 360 380");
  const g = geometry(theta);
  const map = mapper(fixedBasisBounds(), 360, 380, 32);
  el(basisSvg, "path", { d: path([g.O, g.R, g.S], map), class: "dk-top" });
  el(basisSvg, "path", { d: path([g.O, g.P, g.Q], map), class: "dk-bottom" });
  arc(basisSvg, theta, theta + g.alpha, 0.24, map, "dk-alpha-arc");
  [g.O, g.R, g.S, g.P, g.Q].forEach(p => {
    const q = map(p);
    el(basisSvg, "circle", { cx: q[0], cy: q[1], r: 4, class: "dk-node" });
  });
  label(basisSvg, "O", [-0.08, -0.08], map, "", "end");
  label(basisSvg, "P", [1.09, 0.06], map, "", "start");
  label(basisSvg, "Q", [0.53, -0.98], map);
  label(basisSvg, "R", mul(1.16, g.R), map);
  label(basisSvg, "S", mul(1.12, g.S), map);
  const topCenter = mul(1 / 3, add(add(g.O, g.R), g.S));
  const bottomCenter = mul(1 / 3, add(add(g.O, g.P), g.Q));
  edgeLabel(basisSvg, "a", g.O, g.R, topCenter, map);
  edgeLabel(basisSvg, "1", g.O, g.S, topCenter, map);
  edgeLabel(basisSvg, "b", g.R, g.S, topCenter, map);
  edgeLabel(basisSvg, "1", g.O, g.P, bottomCenter, map);
  edgeLabel(basisSvg, "1", g.O, g.Q, bottomCenter, map);
  edgeLabel(basisSvg, "1", g.P, g.Q, bottomCenter, map);
  label(basisSvg, "α", [0.39 * Math.cos(theta + g.alpha / 2), 0.39 * Math.sin(theta + g.alpha / 2)], map, "dk-alpha-label");
}

let basisSweepBounds;
let sweepBounds;
function fixedBasisBounds() {
  if (basisSweepBounds) return basisSweepBounds;
  const g = geometry(basisTheta);
  const points = [g.O, g.R, g.S, g.P, g.Q, mul(1.16, g.R), mul(1.12, g.S)];
  basisSweepBounds = boundsOf(points);
  return basisSweepBounds;
}

function fixedTileBounds() {
  if (sweepBounds) return sweepBounds;
  const points = [];
  for (let k = 0; k <= 120; k++) {
    const theta = Number(slider.min) + (Number(slider.max) - Number(slider.min)) * k / 120;
    const g = geometry(theta, true);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const shift = add(mul(i, g.v1), mul(j, g.v2));
      [g.O, g.R, g.S, g.P, g.Q].forEach(p => points.push(add(p, shift)));
    }
  }
  sweepBounds = boundsOf(points);
  return sweepBounds;
}

function drawTile(theta) {
  tileSvg.replaceChildren();
  tileSvg.setAttribute("viewBox", "0 0 600 380");
  const defs = el(tileSvg, "defs");
  const marker = el(defs, "marker", { id: "dk-arrow", markerWidth: 7, markerHeight: 7, refX: 6, refY: 3.5, orient: "auto", markerUnits: "strokeWidth" });
  el(marker, "path", { d: "M0,0 L7,3.5 L0,7 Z", fill: "var(--dk-red)" });
  const g = geometry(theta, true);
  const map = mapper(fixedTileBounds(), 600, 380, 36);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const shift = add(mul(i, g.v1), mul(j, g.v2));
    const cell = Object.fromEntries(["O", "R", "S", "P", "Q"].map(key => [key, add(g[key], shift)]));
    el(tileSvg, "path", { d: path([cell.O, cell.R, cell.S], map), class: "dk-top" });
    el(tileSvg, "path", { d: path([cell.O, cell.P, cell.Q], map), class: "dk-bottom" });
  }
  const thetaOrigin = add(g.v1, g.v2);
  const thetaStart = Math.atan2(g.P[1], g.P[0]);
  arc(tileSvg, thetaStart, thetaStart + theta, 0.25, map, "dk-theta-arc", thetaOrigin);
  label(
    tileSvg,
    "θ",
    add(thetaOrigin, [
      0.39 * Math.cos(thetaStart + theta / 2),
      0.39 * Math.sin(thetaStart + theta / 2)
    ]),
    map,
    "dk-theta-label"
  );
  const origin = g.O;
  const originMapped = map(origin);
  [g.v1, g.v2].forEach((v, index) => {
    const end = map(add(origin, v));
    el(tileSvg, "line", { x1: originMapped[0], y1: originMapped[1], x2: end[0], y2: end[1], class: "dk-vector", "marker-end": "url(#dk-arrow)" });
    label(tileSvg, ["v₁", "v₂"][index], add(origin, mul(index ? 0.68 : 0.58, v)), map, "dk-vector-label");
  });
}

function strainDeterminant(theta) {
  const { a, alpha } = parameters();
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const ca = Math.cos(theta + alpha);
  const sa = Math.sin(theta + alpha);
  const q = Math.sqrt(3) / 2;
  const A11 = a * c - ca + 0.5;
  const A12 = a * c - 0.5;
  const A21 = a * s - sa + q;
  const A22 = a * s + q;
  const Ap11 = -a * s + sa;
  const Ap12 = -a * s;
  const Ap21 = a * c - ca;
  const Ap22 = a * c;
  const detA = A11 * A22 - A12 * A21;
  if (Math.abs(detA) < 1e-8) return NaN;
  const L11 = (Ap11 * A22 - Ap12 * A21) / detA;
  const L12 = (-Ap11 * A12 + Ap12 * A11) / detA;
  const L21 = (Ap21 * A22 - Ap22 * A21) / detA;
  const L22 = (-Ap21 * A12 + Ap22 * A11) / detA;
  const E12 = (L12 + L21) / 2;
  return L11 * L22 - E12 * E12;
}

function draw() {
  const theta = Number(slider.value);
  const g = geometry(theta);
  const signedArea = g.v1[0] * g.v2[1] - g.v1[1] * g.v2[0];
  const detE = strainDeterminant(theta);
  const kind = !Number.isFinite(detE) ? "singular" : Math.abs(detE) < 1e-4 ? "critical" : detE > 0 ? "elliptic" : "hyperbolic";
  thetaOut.textContent = `θ = ${theta.toFixed(2)} rad (${(theta * 180 / Math.PI).toFixed(1)}°)`;
  thetaOut.dataset.kind = kind;
  thetaControls.dataset.kind = kind;
  root.dataset.kind = kind;
  thetaControl.minOut.textContent = Number(slider.min).toFixed(2);
  thetaControl.maxOut.textContent = `${Number(slider.max).toFixed(2)} rad`;
  thetaControl.valueOut.textContent = theta.toFixed(2);
  aControl.minOut.textContent = Number(aSlider.min).toFixed(2);
  aControl.maxOut.textContent = Number(aSlider.max).toFixed(2);
  aControl.valueOut.textContent = g.a.toFixed(2);
  bControl.minOut.textContent = Number(bSlider.min).toFixed(2);
  bControl.maxOut.textContent = Number(bSlider.max).toFixed(2);
  bControl.valueOut.textContent = g.b.toFixed(2);
  geometryOut.textContent = `Equilateral: (1, 1, 1); scalene: (a, 1, b) with a = ${g.a.toFixed(2)} and b = ${g.b.toFixed(2)}; α = ${g.alpha.toFixed(4)} rad`;
  areaNumber.textContent = Math.abs(signedArea).toFixed(4);
  typeOut.dataset.kind = kind;
  typeOut.textContent = Number.isFinite(detE)
    ? `Compatibility: ${kind}; det ε = ${detE.toFixed(4)}`
    : "Compatibility: singular unit cell";
  drawBasis(basisTheta);
  drawTile(theta);
}

slider.addEventListener("input", draw);
function updateShape() {
  const a = Number(aSlider.value);
  const minimum = Math.abs(a - 1) + 0.01;
  const maximum = a + 1 - 0.01;
  bSlider.min = minimum.toFixed(2);
  bSlider.max = maximum.toFixed(2);
  bSlider.value = Math.min(maximum, Math.max(minimum, Number(bSlider.value))).toFixed(2);
  basisSweepBounds = undefined;
  sweepBounds = undefined;
  draw();
}
aSlider.addEventListener("input", updateShape);
bSlider.addEventListener("input", () => {
  basisSweepBounds = undefined;
  sweepBounds = undefined;
  draw();
});
updateShape();
}

function initUniformPlot() {
  const standardRoot = dkDecorate(document.getElementById('dk-uniform-plot'));
  if (!standardRoot) return;
const uniformControls = standardRoot.createDiv({ cls: "uniform-controls" });
const uniformThetaLine = uniformControls.createDiv({ cls: "uniform-theta-line" });
uniformThetaLine.createSpan({ cls: "uniform-theta-label", text: "θ" });
const uniformThetaSlider = uniformThetaLine.createEl("input", {
  cls: "uniform-theta-slider",
  attr: {
    type: "range",
    min: "0.55",
    max: "3.95",
    step: "0.01",
    value: "1.60",
    "aria-label": "Twist angle theta for the uniformly elliptic Kagome family"
  }
});
const uniformThetaOutput = uniformThetaLine.createEl("output", { cls: "uniform-theta-output" });
const uniformScale = uniformControls.createDiv({ cls: "uniform-scale" });
uniformScale.createSpan({ text: "0.55 rad" });
uniformScale.createSpan({ attr: { "aria-hidden": "true" } });
uniformScale.createSpan({ text: "3.95 rad" });

const uniformPanel = standardRoot.createDiv({ cls: "uniform-panel" });
const uniformPanelLabel = uniformPanel.createDiv({ cls: "uniform-panel-label" });
const standardSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
standardSvg.setAttribute("role", "img");
standardSvg.setAttribute("aria-label", "A three by three uniformly elliptic perturbed Kagome tile anchored at one fixed hinge, with lattice vectors and twist angle");
uniformPanel.appendChild(standardSvg);
const uniformStatus = standardRoot.createDiv({ cls: "uniform-status" });

const sNS = "http://www.w3.org/2000/svg";
function sEl(parent, name, attrs = {}, text = null) {
  const node = document.createElementNS(sNS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (text !== null) node.textContent = text;
  parent.appendChild(node);
  return node;
}
const sAdd = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sSub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const sMul = (scale, p) => [scale * p[0], scale * p[1]];

const perturbedA = 0.95;
const perturbedB = 1.1;
const perturbedAlpha = Math.acos(
  (perturbedA * perturbedA + 1 - perturbedB * perturbedB) / (2 * perturbedA)
);

function uniformGeometry(theta, alignLattice = true) {
  let points = {
    O: [0, 0],
    R: [perturbedA * Math.cos(theta), perturbedA * Math.sin(theta)],
    S: [Math.cos(theta + perturbedAlpha), Math.sin(theta + perturbedAlpha)],
    P: [1, 0],
    Q: [perturbedA * Math.cos(perturbedAlpha), -perturbedA * Math.sin(perturbedAlpha)]
  };
  let v1 = sAdd(sSub(points.R, points.S), sSub(points.P, points.Q));
  let v2 = sSub(points.R, points.Q);
  if (alignLattice) {
    const angle = Math.atan2(v1[1], v1[0]);
    const rotate = p => [
      Math.cos(angle) * p[0] + Math.sin(angle) * p[1],
      -Math.sin(angle) * p[0] + Math.cos(angle) * p[1]
    ];
    points = Object.fromEntries(Object.entries(points).map(([key, point]) => [key, rotate(point)]));
    v1 = rotate(v1);
    v2 = rotate(v2);
  }
  return { ...points, v1, v2 };
}

function uniformStrainDeterminant(theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const ca = Math.cos(theta + perturbedAlpha);
  const sa = Math.sin(theta + perturbedAlpha);
  const cq = Math.cos(perturbedAlpha);
  const sq = Math.sin(perturbedAlpha);
  const A11 = perturbedA * c - ca + 1 - perturbedA * cq;
  const A12 = perturbedA * c - perturbedA * cq;
  const A21 = perturbedA * s - sa + perturbedA * sq;
  const A22 = perturbedA * s + perturbedA * sq;
  const Ap11 = -perturbedA * s + sa;
  const Ap12 = -perturbedA * s;
  const Ap21 = perturbedA * c - ca;
  const Ap22 = perturbedA * c;
  const detA = A11 * A22 - A12 * A21;
  if (Math.abs(detA) < 1e-10) return NaN;
  const L11 = (Ap11 * A22 - Ap12 * A21) / detA;
  const L12 = (-Ap11 * A12 + Ap12 * A11) / detA;
  const L21 = (Ap21 * A22 - Ap22 * A21) / detA;
  const L22 = (-Ap21 * A12 + Ap22 * A11) / detA;
  const E12 = (L12 + L21) / 2;
  return L11 * L22 - E12 * E12;
}

let uniformSweepBounds;
function getUniformSweepBounds() {
  if (uniformSweepBounds) return uniformSweepBounds;
  const points = [];
  for (let k = 0; k <= 160; k++) {
    const theta = 0.55 + (3.95 - 0.55) * k / 160;
    const g = uniformGeometry(theta);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const shift = sAdd(sMul(i, g.v1), sMul(j, g.v2));
      [g.O, g.R, g.S, g.P, g.Q].forEach(point => points.push(sAdd(point, shift)));
    }
  }
  const xs = points.map(point => point[0]);
  const ys = points.map(point => point[1]);
  uniformSweepBounds = {
    minX: Math.min(...xs), maxX: Math.max(...xs),
    minY: Math.min(...ys), maxY: Math.max(...ys)
  };
  return uniformSweepBounds;
}

function drawStandardKagome() {
  standardSvg.replaceChildren();
  const theta = Number(uniformThetaSlider.value);
  const detEpsilon = uniformStrainDeterminant(theta);
  const width = Math.max(340, Math.round(uniformPanel.clientWidth || standardRoot.clientWidth || 760));
  const height = width < 560 ? 350 : 430;
  standardSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  sEl(standardSvg, "title", {}, "Uniformly elliptic perturbed Kagome lattice");
  sEl(standardSvg, "desc", {}, "A three by three periodic Kagome tile made from alternating congruent blue and orange triangles with side lengths zero point nine five, one, and one point one. The central hinge O is fixed while theta changes, and the first primitive lattice vector is horizontal.");
  const defs = sEl(standardSvg, "defs");
  const marker = sEl(defs, "marker", {
    id: "uniform-arrow",
    markerWidth: 7,
    markerHeight: 7,
    refX: 6,
    refY: 3.5,
    orient: "auto",
    markerUnits: "strokeWidth"
  });
  sEl(marker, "path", { d: "M0,0 L7,3.5 L0,7 Z", fill: "var(--color-red, #d64545)" });

  const g = uniformGeometry(theta);
  const cells = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
    const shift = sAdd(sMul(i, g.v1), sMul(j, g.v2));
    const cell = Object.fromEntries(
      ["O", "R", "S", "P", "Q"].map(key => [key, sAdd(g[key], shift)])
    );
    cells.push(cell);
  }

  const bounds = getUniformSweepBounds();
  const paddingX = width < 560 ? 28 : 42;
  const top = 20;
  const bottom = 30;
  const maxAbsX = Math.max(Math.abs(bounds.minX), Math.abs(bounds.maxX));
  const maxAbsY = Math.max(Math.abs(bounds.minY), Math.abs(bounds.maxY));
  const scale = Math.min(
    (width - 2 * paddingX) / (2 * maxAbsX),
    (height - top - bottom) / (2 * maxAbsY)
  );
  const fixedNodeScreen = [width / 2, top + (height - top - bottom) / 2];
  const map = p => [
    fixedNodeScreen[0] + p[0] * scale,
    fixedNodeScreen[1] - p[1] * scale
  ];

  for (const cell of cells) {
    sEl(standardSvg, "polygon", {
      points: [cell.O, cell.R, cell.S].map(map).map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" "),
      class: "standard-blue"
    });
    sEl(standardSvg, "polygon", {
      points: [cell.O, cell.P, cell.Q].map(map).map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" "),
      class: "standard-orange"
    });
  }

  const seen = new Set();
  for (const cell of cells) {
    for (const point of [cell.O, cell.R, cell.S, cell.P, cell.Q]) {
      const p = map(point);
      const key = `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      sEl(standardSvg, "circle", { cx: p[0], cy: p[1], r: 2.1, class: "standard-node" });
    }
  }

  const fixedPoint = map(g.O);
  for (const [vector, vectorLabel, fraction] of [[g.v1, "v₁", 0.58], [g.v2, "v₂", 0.68]]) {
    const end = map(vector);
    sEl(standardSvg, "line", {
      x1: fixedPoint[0], y1: fixedPoint[1], x2: end[0], y2: end[1],
      class: "uniform-vector", "marker-end": "url(#uniform-arrow)"
    });
    const labelPoint = map(sMul(fraction, vector));
    sEl(standardSvg, "text", {
      x: labelPoint[0], y: labelPoint[1],
      class: "uniform-vector-label", "text-anchor": "middle", "dominant-baseline": "middle"
    }, vectorLabel);
  }

  const thetaOrigin = sAdd(g.v1, g.v2);
  const thetaStart = Math.atan2(g.P[1], g.P[0]);
  const thetaRadius = 0.25;
  const arcPointCount = Math.max(12, Math.ceil(theta * 28)) + 1;
  const arcPoints = Array.from({ length: arcPointCount }, (_, index) => {
    const angle = thetaStart + theta * index / (arcPointCount - 1);
    return sAdd(thetaOrigin, [thetaRadius * Math.cos(angle), thetaRadius * Math.sin(angle)]);
  });
  const arcPath = arcPoints.map((point, index) => {
    const mapped = map(point);
    return `${index ? "L" : "M"}${mapped[0].toFixed(2)},${mapped[1].toFixed(2)}`;
  }).join(" ");
  sEl(standardSvg, "path", { d: arcPath, class: "uniform-theta-arc" });
  const thetaLabelPoint = map(sAdd(thetaOrigin, [
    0.39 * Math.cos(thetaStart + theta / 2),
    0.39 * Math.sin(thetaStart + theta / 2)
  ]));
  sEl(standardSvg, "text", {
    x: thetaLabelPoint[0], y: thetaLabelPoint[1],
    class: "uniform-theta-label-svg", "text-anchor": "middle", "dominant-baseline": "middle"
  }, "θ");
  sEl(standardSvg, "circle", {
    cx: fixedPoint[0], cy: fixedPoint[1], r: 5.1,
    class: "standard-fixed-node"
  });

  uniformThetaOutput.textContent = `θ = ${theta.toFixed(2)} rad (${(theta * 180 / Math.PI).toFixed(1)}°)`;
  uniformPanelLabel.textContent = `a = ${perturbedA.toFixed(2)} and b = ${perturbedB.toFixed(1)}; congruent sides (${perturbedA.toFixed(2)}, 1, ${perturbedB.toFixed(1)}); α ≈ ${perturbedAlpha.toFixed(4)}; θ = ${theta.toFixed(2)}`;
  const criticalTheta = Math.PI - perturbedAlpha;
  const isCritical = Math.abs(theta - criticalTheta) < 0.0005;
  const nonnegativeDeterminant = Math.max(0, detEpsilon);
  const determinantText = Number.isFinite(detEpsilon)
    ? nonnegativeDeterminant < 1e-4
      ? nonnegativeDeterminant.toExponential(3)
      : nonnegativeDeterminant.toFixed(6)
    : "undefined";
  uniformStatus.textContent = isCritical
    ? `Compatibility: critical; det ε = ${determinantText}. This is an isolated configuration, not a hyperbolic interval.`
    : `Compatibility: elliptic; det ε = ${determinantText}.`;
}

const standardObserver = new ResizeObserver(drawStandardKagome);
standardObserver.observe(standardRoot);
uniformThetaSlider.addEventListener("input", drawStandardKagome);
requestAnimationFrame(drawStandardKagome);
}

function initRegimePlot() {
  const regimeRoot = dkDecorate(document.getElementById('dk-regime-plot'));
  if (!regimeRoot) return;
const regimeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
regimeSvg.setAttribute("role", "img");
regimeSvg.setAttribute("aria-label", "A row of deformed Kagome lattices showing elliptic regions on both sides and a hyperbolic region between two transition angles");
regimeRoot.appendChild(regimeSvg);

const regimeCaption = regimeRoot.createDiv({ cls: "regime-caption" });
const captionText = regimeCaption.createEl("p");
captionText.innerHTML = "For the parameters in the interactive figure, <i>a</i> = 0.72, <i>b</i> = 0.57, and <i>α</i> ≈ 0.5938. Over the displayed slider range 0.55 ≤ <i>θ</i> ≤ 3.95: the structure is elliptic for 0.55 ≤ <i>θ</i> < 2.0907 or 2.8527 < <i>θ</i> ≤ 3.95, hyperbolic for 2.0907 < <i>θ</i> < 2.8527, and critical at <i>θ</i> ≈ 2.0907 and 2.8527.";

const rNS = "http://www.w3.org/2000/svg";
const ra = 0.72;
const rb = 0.57;
const rAlpha = Math.acos((ra * ra + 1 - rb * rb) / (2 * ra));
const thetaMin = 0.55;
const thetaLeft = 2.0907144311;
const thetaRight = 2.8526645150;
const thetaMax = 3.95;

function rEl(parent, name, attrs = {}, text = null) {
  const node = document.createElementNS(rNS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (text !== null) node.textContent = text;
  parent.appendChild(node);
  return node;
}

function rFormulaLabel(parent, x, y, parts) {
  const text = rEl(parent, "text", {
    x,
    y,
    "text-anchor": "middle",
    class: "regime-angle"
  });
  for (const part of parts) {
    const attrs = {};
    if (part.shift) {
      attrs["baseline-shift"] = part.shift;
      attrs["font-size"] = "8px";
    }
    rEl(text, "tspan", attrs, part.text);
  }
}

function rAdd(p, q) { return [p[0] + q[0], p[1] + q[1]]; }
function rSub(p, q) { return [p[0] - q[0], p[1] - q[1]]; }
function rMul(s, p) { return [s * p[0], s * p[1]]; }

function regimeGeometry(theta) {
  const O = [0, 0];
  const R = [ra * Math.cos(theta), ra * Math.sin(theta)];
  const S = [Math.cos(theta + rAlpha), Math.sin(theta + rAlpha)];
  const P = [1, 0];
  const Q = [0.5, -Math.sqrt(3) / 2];
  let v1 = rAdd(rSub(R, S), rSub(P, Q));
  let v2 = rSub(R, Q);
  const angle = Math.atan2(v1[1], v1[0]);
  const rotate = p => [
    Math.cos(angle) * p[0] + Math.sin(angle) * p[1],
    -Math.sin(angle) * p[0] + Math.cos(angle) * p[1]
  ];
  const points = { O: rotate(O), R: rotate(R), S: rotate(S), P: rotate(P), Q: rotate(Q) };
  v1 = rotate(v1);
  v2 = rotate(v2);
  return { ...points, v1, v2 };
}

function latticePatch(parent, theta, centerX, topY, boxW, boxH) {
  const g = regimeGeometry(theta);
  const raw = [];
  const cells = [];
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const shift = rAdd(rMul(i, g.v1), rMul(j, g.v2));
    const cell = Object.fromEntries(["O", "R", "S", "P", "Q"].map(key => [key, rAdd(g[key], shift)]));
    cells.push(cell);
    raw.push(cell.O, cell.R, cell.S, cell.P, cell.Q);
  }
  const xs = raw.map(p => p[0]);
  const ys = raw.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = Math.min(boxW / Math.max(maxX - minX, 0.1), boxH / Math.max(maxY - minY, 0.1));
  const map = p => [
    centerX + (p[0] - (minX + maxX) / 2) * scale,
    topY + boxH / 2 - (p[1] - (minY + maxY) / 2) * scale
  ];
  for (const cell of cells) {
    const triangles = [[cell.O, cell.R, cell.S], [cell.O, cell.P, cell.Q]];
    for (const [triangleIndex, triangle] of triangles.entries()) {
      rEl(parent, "polygon", {
        points: triangle.map(map).map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" "),
        class: `regime-structure ${triangleIndex === 0 ? "regime-triangle-scalene" : "regime-triangle-equilateral"}`
      });
    }
  }
  const seen = new Set();
  for (const point of raw) {
    const p = map(point);
    const key = `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rEl(parent, "circle", { cx: p[0], cy: p[1], r: 1.8, class: "regime-joint" });
  }
}

function drawRegimeRow() {
  regimeSvg.replaceChildren();
  const width = Math.max(340, Math.round(regimeRoot.clientWidth || 760));
  const compact = width < 560;
  const height = compact ? 276 : 310;
  const left = compact ? 16 : 26;
  const right = compact ? 16 : 26;
  const bandTop = 18;
  const bandHeight = 38;
  const arrowY = height - 34;
  const plotWidth = width - left - right;
  const columnWidth = plotWidth / 5;
  regimeSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  rEl(regimeSvg, "title", {}, "Elliptic and hyperbolic Kagome lattice regimes");
  rEl(regimeSvg, "desc", {}, "Five equally spaced lattice snapshots ordered by increasing twist angle: elliptic, critical, hyperbolic, critical, and elliptic.");

  const defs = rEl(regimeSvg, "defs");
  const arrow = rEl(defs, "marker", { id: "dk-regime-arrow", markerWidth: 7, markerHeight: 7, refX: 6, refY: 3.5, orient: "auto", markerUnits: "strokeWidth" });
  rEl(arrow, "path", { d: "M0,0 L7,3.5 L0,7 Z", fill: "var(--text-muted)" });

  const samples = [
    { theta: 0.82, label: "ELLIPTIC", fill: "elliptic" },
    { theta: thetaLeft, label: "CRITICAL", fill: "elliptic-to-hyperbolic", critical: true },
    { theta: 2.47, label: compact ? "HYPER." : "HYPERBOLIC", fill: "hyperbolic" },
    { theta: thetaRight, label: "CRITICAL", fill: "hyperbolic-to-elliptic", critical: true },
    { theta: 3.80, label: "ELLIPTIC", fill: "elliptic" }
  ];
  const thetaC1 = [
    { text: "θ" },
    { text: "c", shift: "sub" },
    { text: "1", shift: "super" }
  ];
  const thetaC2 = [
    { text: "θ" },
    { text: "c", shift: "sub" },
    { text: "2", shift: "super" }
  ];
  const regimeLabels = [
    [{ text: "θ < " }, ...thetaC1],
    [{ text: "θ = " }, ...thetaC1],
    [...thetaC1, { text: " < θ < " }, ...thetaC2],
    [{ text: "θ = " }, ...thetaC2],
    [{ text: "θ > " }, ...thetaC2]
  ];

  const bodyHeight = arrowY - bandTop - 12;
  for (let index = 0; index < samples.length; index++) {
    const sample = samples[index];
    const x0 = left + index * columnWidth;
    const centerX = x0 + columnWidth / 2;
    const halves = sample.fill === "elliptic-to-hyperbolic"
      ? [["regime-elliptic", 0], ["regime-hyperbolic", 0.5]]
      : sample.fill === "hyperbolic-to-elliptic"
        ? [["regime-hyperbolic", 0], ["regime-elliptic", 0.5]]
        : [[sample.fill === "elliptic" ? "regime-elliptic" : "regime-hyperbolic", 0]];

    for (const [cls, offset] of halves) {
      const segmentWidth = halves.length === 1 ? columnWidth : columnWidth / 2;
      rEl(regimeSvg, "rect", { x: x0 + offset * columnWidth, y: bandTop, width: segmentWidth, height: bodyHeight, class: cls, opacity: 0.08 });
      rEl(regimeSvg, "rect", { x: x0 + offset * columnWidth, y: bandTop, width: segmentWidth, height: bandHeight, class: cls, opacity: 0.25 });
    }

    if (sample.critical) {
      rEl(regimeSvg, "line", { x1: centerX, y1: bandTop, x2: centerX, y2: arrowY - 12, class: "regime-transition" });
    }
    rEl(regimeSvg, "text", { x: centerX, y: bandTop + 24, "text-anchor": "middle", class: "regime-name", "font-size": compact ? 11 : 13 }, sample.label);

    const patchWidth = Math.min(compact ? 45 : 84, columnWidth * 0.68);
    const patchHeight = compact ? 90 : 120;
    const patchTop = compact ? 68 : 70;
    latticePatch(regimeSvg, sample.theta, centerX, patchTop, patchWidth, patchHeight);
    rFormulaLabel(
      regimeSvg,
      centerX,
      patchTop + patchHeight + 18,
      regimeLabels[index]
    );
  }

  rEl(regimeSvg, "line", { x1: left + 4, y1: arrowY, x2: width - right - 4, y2: arrowY, class: "regime-axis", "marker-end": "url(#dk-regime-arrow)" });
  rEl(regimeSvg, "text", { x: width / 2, y: height - 5, "text-anchor": "middle" }, "increasing twist angle θ");
}

const regimeObserver = new ResizeObserver(drawRegimeRow);
regimeObserver.observe(regimeRoot);
requestAnimationFrame(drawRegimeRow);
}

  function initializeDeformedKagomeNote() {
    initKagomeHero();
    initKagomeInteractive();
    initUniformPlot();
    initRegimePlot();
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDeformedKagomeNote);
  } else {
    initializeDeformedKagomeNote();
  }
})();
