---
layout: page
title: Pseudo-magnetism in the slowly-strained discrete honeycomb lattice
description: Discrete multiscale analysis, magnetic Dirac operators, and Landau levels in strained honeycomb lattices.
img: assets/img/landau-level.png
img_top: assets/img/landau-level-top.png
img_bottom: assets/img/landau-level-bottom.png
coauthors: >-
  Joint work with <a href='https://www.columbia.edu/~miw2103/'>Michael I. Weinstein</a>.
importance: 3
category: research
permalink: /research/pseudo-magnetism/
---

Honeycomb lattices, underlying 2D materials like graphene, possess special points in their band structures known as <em>Dirac points</em>, where two dispersion surfaces intersect conically. Near these points, the electronic or wave dynamics are governed by an effective two-dimensional Dirac operator. The fact that wavepackets evolve under these effective dynamics is key to understanding the remarkable electronic properties of graphene and selected materials.

In photonic crystals, a remarkable feature arises when the lattice is strained: slowly-varying non-uniform deformations generate effective pseudo-magnetic potentials that alter the band structure and, in turn, the wave propagation. In particular, the slowly-varying quadratic displacement is predicted to generate a Landau gauge for a constant magnetic field. This, in turn, gives rise to <em>Landau levels</em>, which appear in the band structure as flat energy bands. Flat bands imply vanishing group velocity; wavepackets supported on them remain localized rather than spreading, with their energy effectively trapped in the lattice. This phenomenon has been confirmed experimentally.

Motivated by observations in photonic strained honeycomb lattices, we analyze slowly strained honeycomb lattices within a discrete tight-binding model. We use a formal discrete multiscale expansion and derive an effective 2D magnetic Dirac operator for general deformations, which agrees with predictions from the photonic and electronic settings. We also prove the first rigorous convergence result of the discrete multiscale expansion for truncated Landau-gauge deformations with bounded gradients.

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.html path="assets/img/landau-level.png" title="Honeycomb structure with Dirac points and Landau levels." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Honeycomb structure with Dirac points in the band structure and deformed honeycomb with Landau levels.
</div>

This is a joint work with <a href='https://www.columbia.edu/~miw2103/'>Michael I. Weinstein</a>.

<h2 class="bibliography related-papers-heading">Related papers</h2>

<div class="publications related-papers">

{% bibliography -f {{ site.scholar.bibliography }} -q @*[research_project=pseudo]* %}

</div>
