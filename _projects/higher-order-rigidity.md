---
layout: page
title: Higher-order rigid bar-joint frameworks with applications to tensegrity structures
description: Constructing higher-order rigid and singular flexible frameworks through optimization and saddle-search methods.
img: assets/img/tensegrity.png
coauthors: >-
  Joint work with <a href='https://personal.math.ubc.ca/~holmescerfon/'>Miranda Holmes-Cerfon</a>, <a href='https://artsandsciences.syracuse.edu/people/faculty/christian-d-santangelo/'>Christian D Santangelo</a>, and Mihnea Leonte.
importance: 2
category: research
permalink: /research/higher-order-rigidity/
---

Bar-joint frameworks are widely used to study the structural behavior of interconnected systems. A central problem in these frameworks is to determine whether a framework is locally rigid, meaning that every edge-length-preserving motion is a rigid-body motion. There are several sufficient conditions: the strongest is first-order rigidity, where small deformations immediately change bar lengths, while a weaker notion is prestress stability, in which rigidity arises under specific internal tensions.

Still weaker notions exist, in which bar lengths change only at higher order, making such frameworks mechanically "shaky." We use the term <em>higher-order rigid</em> to describe frameworks that are rigid but not first-order rigid. One prominent type of higher-order rigid framework is the class of <a href='https://en.wikipedia.org/wiki/Tensegrity'>tensegrity structures</a> -- rigid assemblies of bars and cables stabilized by self-stress. These tensegrity structures are closely related to prestress stability and enable lightweight, adaptive designs such as <a href='https://www.nasa.gov/image-article/super-ball-bot/'>NASA's Superball Bot</a>, which can absorb complex impact loads and traverse rough terrain.

Yet such frameworks are rare. Known examples are usually hand-crafted and rely on special symmetries, such as parallel bars, repeated edge lengths, or coplanar vertices. We have developed a systematic approach to constructing higher-order rigid frameworks. Our findings show that prestress-stable frameworks, rather than being rare, arise robustly as solutions to a simple optimization problem.

<div class="row justify-content-sm-center">
    <div class="col-sm-12 mt-3 mt-md-0">
        {% include figure.html path="assets/img/tensegrity.png" title="Tensegrity structures found by constrained optimization." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The first row shows tensegrity structures with high symmetry; the second row shows new tensegrity structures found by our constrained optimization approach.
</div>

This is a joint work with <a href='https://personal.math.ubc.ca/~holmescerfon/'>Miranda Holmes-Cerfon</a> and <a href='https://artsandsciences.syracuse.edu/people/faculty/christian-d-santangelo/'>Christian D Santangelo</a>.

Another research interest of mine is related to the <b>singularity</b> of bar frameworks. Singular and flexible frameworks are valuable in robotics, as they enable transitions between distinct kinematic configurations without complex reconfiguration. However, such structures are as rare as higher-order rigid frameworks. To address this, we have developed a systematic constrained saddle-search approach for constructing these singular and flexible frameworks.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/heptagon/heptagon-4-branch-2.gif" title="One branch of nonlinear flex at the singular structure." class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/heptagon/heptagon-4-branch-4.gif" title="Another branch of nonlinear flex at the singular structure." class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Two branches of nonlinear flex at the singular structure.
</div>

This is a joint work with <a href='https://personal.math.ubc.ca/~holmescerfon/'>Miranda Holmes-Cerfon</a>, <a href='https://artsandsciences.syracuse.edu/people/faculty/christian-d-santangelo/'>Christian D Santangelo</a>, and my student Mihnea Leonte at Columbia University. The code of our constrained saddle search approach to construct singular and flexible bar frameworks can be found <a href='https://github.com/xuenanli/constrained-saddle-search'>here</a>.

<h2 class="bibliography related-papers-heading">Related papers</h2>

<div class="publications related-papers">

{% bibliography -f {{ site.scholar.bibliography }} -q @*[research_project=rigidity]* %}

</div>
