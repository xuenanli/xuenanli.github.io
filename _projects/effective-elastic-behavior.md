---
layout: page
title: Effective elastic behavior of mechanism-based mechanical metamaterials
description: Effective theories, soft modes, and zero-energy deformations in mechanism-based materials.
img: assets/img/kagome-3-center-width-3q-height-3q.gif
coauthors: >-
  Joint work with <a href='https://math.nyu.edu/~kohn/'>Robert V. Kohn</a>; numerical collaboration with <a href='https://seas.harvard.edu/person/katia-bertoldi'>Katia Bertoldi</a> and <a href='https://www.boleideng.com'>Bolei Deng</a>.
importance: 1
category: research
permalink: /research/effective-elastic-behavior/
---

This project addresses problems from an emerging area of mechanics known as <i>mechanism-based mechanical metamaterials</i>. These materials often consist of periodically arranged building blocks, resembling elastic composites. However, compared to traditional elastic composites, these mechanism-based mechanical metamaterials are more degenerate, since they can deform with zero elastic energy. Such deformations are called <i>mechanisms</i>.

One fascinating consequence of the presence of mechanisms in these metamaterials is their degenerate elastic behavior. In fact, these materials possess <i>soft modes</i>, which are large deformations that require only a small amount of elastic energy. Interestingly, the soft modes often result in global deformations that are entirely different from those of the mechanisms. A significant portion of my research is dedicated to developing an effective theoretical framework to study specialized mechanism-based mechanical metamaterials, where soft modes correspond to deformations that result in zero effective elastic energy.

A vivid and illustrative example for explaining our work on mechanism-based mechanical metamaterials is the <i>Kagome lattice</i>, which is a 2D tiling consisting of triangles and hexagons. Deriving an effective theory is not simple for the Kagome lattice since it has an infinite number of mechanisms. The following two figures show two different mechanisms of the Kagome lattice.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/kagome.gif" title="A one-periodic mechanism." class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/kagome-2.gif" title="A two-periodic mechanism." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A one-periodic mechanism and a two-periodic mechanism.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.html path="assets/img/kagome-3.gif" title="A non-uniform soft mode that approximates a conformal deformation." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A non-uniform soft mode that approximates a conformal deformation.
</div>

This is a joint work with my PhD advisor <a href='https://math.nyu.edu/~kohn/'>Robert V. Kohn</a> at Courant Institute. The numerical work is a collaboration with <a href='https://seas.harvard.edu/person/katia-bertoldi'>Katia Bertoldi</a> and <a href='https://www.boleideng.com'>Bolei Deng</a>.

<h2 class="bibliography related-papers-heading">Related papers</h2>

<div class="publications related-papers">

{% bibliography -f {{ site.scholar.bibliography }} -q @*[research_project=effective]* %}

</div>
