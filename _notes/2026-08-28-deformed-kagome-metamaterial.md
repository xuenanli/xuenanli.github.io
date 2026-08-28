---
title: Deformed Kagome metamaterial
date: 2026-08-28 10:00:00-0400
description: A one-parameter mechanism showing how a deformed Kagome metamaterial changes from elliptic to hyperbolic.
tags: ["deformed Kagome metamaterial", mechanism]
thumbnail: /assets/img/deformed-kagome-hero.svg
thumbnail_alt: A deformed Kagome lattice matching the figure at the top of the note.
permalink: /notes/deformed-kagome-metamaterial/
---

<link rel="stylesheet" href="{{ '/assets/css/deformed_kagome.css' | relative_url }}?v=20260828b">

<div id="dk-kagome-hero" class="dk-hero" aria-label="Deformed Kagome metamaterial hero figure"></div>

This deformed Kagome construction uses a rigid equilateral triangle with side length $1$ and a rigid scalene triangle with side lengths $(a,1,b)$. They meet at a hinge. The $a,b$ sliders change the triangle shown in Figures A and B, while the $\theta$ slider deforms Figure B only; Figure A remains at a fixed reference orientation. The admissible range of $b$ updates with $a$ to enforce the triangle inequality $\lvert a-1\rvert<b<a+1$.

<div id="dk-kagome-interactive" class="dk-note" aria-label="Interactive deformed Kagome geometry"></div>

## Geometry of the unit cell

Pin the common hinge at $O=(0,0)$. For the equilateral triangle, take

$$
P=(1,0),\qquad Q=\left(\frac12,-\frac{\sqrt3}{2}\right).
$$

For the scalene triangle, the sides meeting at $O$ have lengths $a$ and $1$, with included angle $\alpha$. Its moving vertices are

$$
R=\begin{pmatrix}a\cos\theta\\a\sin\theta\end{pmatrix},
\qquad
S=\begin{pmatrix}\cos(\theta+\alpha)\\\sin(\theta+\alpha)\end{pmatrix}.
$$

The third side has length $b$, so

$$
b^2=a^2+1-2a\cos\alpha,
\qquad
\alpha=\cos^{-1}\!\left(\frac{a^2+1-b^2}{2a}\right).
$$

Place the primitive lattice vectors into the columns of the deformation matrix. Written as a single matrix equation with the full $\theta$ dependence,

$$
\boxed{
A(\theta)
=\begin{bmatrix}\mathbf v_1&\mathbf v_2\end{bmatrix}
=\begin{pmatrix}
a\cos\theta-\cos(\theta+\alpha)+\frac12
&
a\cos\theta-\frac12
\\
a\sin\theta-\sin(\theta+\alpha)+\frac{\sqrt3}{2}
&
a\sin\theta+\frac{\sqrt3}{2}
\end{pmatrix}
}.
$$

It is worth noting that this one-parameter family of deformations with macroscopic deformation gradient $A(\theta)$ has not modulated the rigid body motions yet (since $\mathbf v_1$ is changing the orientation in this notation). One can modulate out the rigid body motions by fixing $\mathbf v_1$ in the horizontal direction as shown in the right figure of the above interactive figure.

## Area of the unit cell

The unit cell is the parallelogram spanned by the two columns of $A(\theta)$, and its area is

$$
\begin{aligned}
\left|\det A(\theta)\right|&=\Bigg|
\left(a\cos\theta-\cos(\theta+\alpha)+\frac12\right)
\left(a\sin\theta+\frac{\sqrt3}{2}\right)\\
&\qquad-
\left(a\sin\theta-\sin(\theta+\alpha)+\frac{\sqrt3}{2}\right)
\left(a\cos\theta-\frac12\right)
\Bigg|.
\end{aligned}
$$

After expansion, the terms $a^2\cos\theta\sin\theta$ and $\frac{\sqrt3}{2}a\cos\theta$ cancel, and we simplify the area as

$$
\boxed{
\left|\det A(\theta)\right|
=\left|
\frac{\sqrt3}{2}+a\sin\alpha+a\sin\theta
-\cos\left(\theta+\alpha-\frac\pi6\right)
\right|
}.
$$

## Angle of maximum area

For fixed $a$ and $\alpha$, write the signed determinant as

$$
D(\theta)=\det A(\theta)
=\frac{\sqrt3}{2}+a\sin\alpha
+\left(a+\sin\left(\alpha-\frac\pi6\right)\right)\sin\theta
-\cos\left(\alpha-\frac\pi6\right)\cos\theta.
$$

Its maximum occurs at

$$
\boxed{
\theta_{\max}
=\frac\pi2+\operatorname{atan2}\!\left(
\cos\left(\alpha-\frac\pi6\right),
a+\sin\left(\alpha-\frac\pi6\right)
\right)
\pmod{2\pi}
}.
$$

At this angle,

$$
\max_{\theta}\left|\det A(\theta)\right|
=\frac{\sqrt3}{2}+a\sin\alpha
+\sqrt{a^2+1+2a\sin\left(\alpha-\frac\pi6\right)}.
$$

For $a=0.72$ and $b=0.57$, $\alpha\approx0.5938$ rad and $\theta_{\max}\approx2.4717$ rad $(141.62^\circ)$.

## Ellipticity and hyperbolicity

Differentiate the lattice matrix with respect to the mechanism angle:

$$
\boxed{
A'(\theta)=\frac{\mathrm dA}{\mathrm d\theta}
=
\begin{pmatrix}
-a\sin\theta+\sin(\theta+\alpha) & -a\sin\theta
\\
a\cos\theta-\cos(\theta+\alpha) & a\cos\theta
\end{pmatrix}
}.
$$

The incremental deformation measured in the current lattice is

$$
L(\theta)=A'(\theta)A(\theta)^{-1}.
$$

Its antisymmetric part is an infinitesimal rigid rotation, so the strain associated with the soft mechanism is the symmetric part

$$
\boxed{
\varepsilon(\theta)
=\operatorname{sym}L(\theta)
=\frac12\left[L(\theta)+L(\theta)^{\mathsf T}\right]
}.
$$

The sign of its determinant gives the long-wavelength compatibility type:

$$
\begin{array}{ccl}
\det\varepsilon(\theta)>0 &\Longrightarrow& \text{elliptic (the two principal strains have the same sign)},\\
\det\varepsilon(\theta)<0 &\Longrightarrow& \text{hyperbolic (the principal strains have opposite signs)},\\
\det\varepsilon(\theta)=0 &\Longrightarrow& \text{critical transition}.
\end{array}
$$

## When the material is uniformly elliptic

Uniform ellipticity means that $\det\varepsilon(\theta)\geq0$ throughout the one-parameter family, so the structure has no interval of hyperbolic behavior. Isolated critical configurations, where $\det\varepsilon(\theta)=0$, may still occur. The figure below shows a small symmetric perturbation of the regular Kagome lattice with $a=0.95$ and $b=1.1$: both triangles are congruent, with side lengths $(0.95,1,1.1)$. For this perturbed family, $\det\varepsilon(\theta)$ remains nonnegative over the displayed mechanism range, so no hyperbolic region appears. Its isolated zero occurs at $\theta_c=\pi-\alpha\approx1.9439$ rad, where the incremental deformation is a pure infinitesimal rotation and $\varepsilon(\theta_c)=0$.

<div id="dk-uniform-plot" class="standard-kagome-plot" aria-label="Uniformly elliptic Kagome family"></div>

## When the material changes from elliptic to hyperbolic
In general, when a deformed Kagome metamaterial is not uniform elliptic, it has two critical angles, $\theta_c^1$ and $\theta_c^2$ where the material transits between being elliptic and hyperbolic. The regions in which the structure is elliptic or hyperbolic are shown in the figure below.

<div id="dk-regime-plot" class="dk-regime-row" aria-label="Elliptic and hyperbolic Kagome regimes"></div>

## Reference

- D. Zeb Rocklin, Shangnan Zhou, Kai Sun, and Xiaoming Mao, [Transformable topological mechanical metamaterials](https://doi.org/10.1038/ncomms14201), *Nature Communications* **8**, 14201 (2017).

<script defer src="{{ '/assets/js/deformed_kagome.js' | relative_url }}"></script>
