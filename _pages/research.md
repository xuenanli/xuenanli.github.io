---
layout: page
permalink: /research/
title: Research
description:
nav: true
nav_order: 2
---


<p>My research primarily explores the application of Calculus of Variations and spectral theory in material science, with a particular focus on understanding <i>mechanical metamaterials</i> -- carefully designed materials that exhibit exotic functionalities -- from a mathmatical perspective. For an overview of mechanical metamaterials, you can refer to this <a href='https://www.nature.com/articles/natrevmats201766'>Nature review paper</a>.</p>  

<p>My current projects on mechanical metamaterials can be categorized into the following areas:</p>


<!-- Jumping Link -->
<ul>
    <li><a href="#section1">Effective elastic behavior of mechanism-based mechanical metamaterials</a></li>
    <li><a href="#section2">Singular bar frameworks and tensegrity frameworks</a></li>
    <li><a href="#section3">Pseudo-magnetism in the slowly-strained discrete honeycomb lattice</a></li>
</ul>

<hr> <!-- This is the section separator -->


<!-- Target Sections: effective elastic behavior -->
<h2 id="section1" style="font-size: 18px; font-weight: bold;">• Effective elastic behavior of mechanism-based mechanical metamaterials</h2>
<p>This project addresses problems from an emerging area of mechanics known as <i>mechanism-based mechanical metamaterials</i>. These materials often consist of periodically arranged building blocks, resembling elastic composites. However, compared to the traditional elastic composites, these mechanism-based mechanical metamaterials are more degenerate, since they can deform with zero elastic energy. Such deformations are called <i>mechanisms</i>.</p>

<p>One fascinating consequence of the presence of mechanisms in these metamaterials is their degenerate elastic behavior. In fact, these materials possess <i>soft modes</i>, which are large deformations that require only a small amount of elastic energy. Interestingly, the soft modes often result in global deformations that are entirely different from those of the mechanisms. A significant portion of my research is dedicated to developing an effective theoretical framework to study specialized mechanism-based mechanical metamaterials, where soft modes correspond to deformations that result in zero effective elastic energy.</p>

<p>A vivid and illustrative example for explaining our work on mechanism-based mechanical metamaterials is the <i>Kagome lattice</i>, which is a 2D tiling consisting of triangles and hexagons. Deriving an effective theory is not simple for the Kagome lattice since it has an infinite number of mechanisms. The following two figures show two different mechanisms of the Kagome lattice.</p>


<table align="center">
    <tr>
        <!-- First Figure -->
        <td>
            <figure>
                <img src="/assets/img/kagome.gif" alt="kagome-1" width="300">
                <figcaption>
                    <center>A one-periodic mechanism.</center>
                </figcaption>
            </figure>
        </td>
        <!-- Second Figure -->
        <td>
            <figure>
                <img src="/assets/img/kagome-2.gif" alt="kagome-2" width="300">
                <figcaption>
                    <center>A two-periodic mechanism.</center>
                </figcaption>
            </figure>
        </td>
    </tr>
</table>

<table align="center">
    <tr>
        <!-- A big figure that takes a whole line -->
        <td>
            <figure>
                <img src="/assets/img/kagome-3.gif" alt="kagome-3" width="770">
                <figcaption>
                    <center>A non-uniform soft mode that approximates a conformal deformation.</center>
                </figcaption>
            </figure>
        </td>
    </tr>
</table>

<p>This is a joint work with my PhD advisor <a href='https://math.nyu.edu/~kohn/'>Robert V. Kohn</a> at Courant Institute. The numerical work is a collaboration with <a href='https://seas.harvard.edu/person/katia-bertoldi'>Katia Bertoldi</a> and <a href='https://www.boleideng.com'>Bolei Deng</a>.</p>

<hr> <!-- This is the section separator -->

<!-- Target Sections: effective elastic behavior -->
<h2 id="section2" style="font-size: 18px; font-weight: bold;">• Higher-order rigid bar joint frameworks with applications to tensegrity structures</h2>

<p>Bar-joint frameworks are widely used to study the structural behavior of interconnected systems. A central problem in these frameworks is to determine whether a framework is locally rigid, meaning that every edge-length-preserving motion is a rigid-body motion. There are several sufficient conditions: the strongest is first-order rigidity, where small deformations immediately change bar lengths, while a weaker notion is prestress stability, in which rigidity arises under specific internal tensions.</p>

<p>Still weaker notions exist, in which bar lengths change only at higher order, making such frameworks mechanically "shaky." We use the term <em>higher-order rigid</em> to describe frameworks that are rigid but not first-order rigid. One prominent type of higher-order rigid framework is the class of <a href='https://en.wikipedia.org/wiki/Tensegrity'>tensegrity structures</a> -- rigid assemblies of bars and cables stabilized by self-stress. These tensegrity structures are closely related to prestress stability and enable lightweight, adaptive designs such as <a href='https://www.nasa.gov/image-article/super-ball-bot/'>NASA’s Superball Bot</a>, which can absorb complex impact loads and traverse rough terrain.</p>

<p>Yet such frameworks are rare. Known examples are usually hand-crafted and rely on special symmetries, such as parallel bars, repeated edge lengths, or coplanar vertices. We have developed a systematic approach to constructing higher-order rigid frameworks. Our findings show that prestress-stable frameworks, rather than being rare, arise robustly as solutions to a simple optimization problem.</p>

<table align="center">
    <tr>
        <!-- A big figure that takes a whole line -->
        <td>
            <figure>
                <img src="/assets/img/tensegrity.png" alt="tensegrity" width="770">
                <figcaption>
                    <center>The first row shows the tensegrity structures with high symmetry; the second row shows the new tensegrity structures found by our constrained optimization approach.</center>
                </figcaption>
            </figure>
        </td>
    </tr>
</table>

<p>This is a joint work with <a href='https://personal.math.ubc.ca/~holmescerfon/'>Miranda Holmes-Cerfon</a> and <a href='https://artsandsciences.syracuse.edu/people/faculty/christian-d-santangelo/'>Christian D Santangelo</a>.</p>

<hr> <!-- This is the section separator -->

<p>Another research interest of mine is related to the <b>singularity</b> of bar frameworks. Singular and flexible frameworks are valuable in robotics, as they enable transitions between distinct kinematic configurations without complex reconfiguration. However, such structures are as rare as higher-order rigid frameworks. To address this, we have developed a systematic constrained saddle-search approach for constructing these singular and flexible frameworks.</p>

<p></p>

<table align="center">
    <tr>
        <!-- First Figure -->
        <td>
            <figure>
                <img src="/assets/img/heptagon/heptagon-4-branch-2.gif" alt="kagome-1" width="300">
                <figcaption>
                    <center>One branch of nonlinear flex at the singular structure.</center>
                </figcaption>
            </figure>
        </td>
        <!-- Second Figure -->
        <td>
            <figure>
                <img src="/assets/img/heptagon/heptagon-4-branch-4.gif" alt="kagome-2" width="300">
                <figcaption>
                    <center>Another branch of nonlinear flex at the singular structure.</center>
                </figcaption>
            </figure>
        </td>
    </tr>
</table>

<p>This is a joint work with <a href='https://personal.math.ubc.ca/~holmescerfon/'>Miranda Holmes-Cerfon</a>, <a href='https://artsandsciences.syracuse.edu/people/faculty/christian-d-santangelo/'>Christian D Santangelo</a> and my student Mihnea Leonte at Columbia University. The code of our constrained saddle search approach to construct singular and flexible bar framework can be found <a href='https://github.com/xuenanli/constrained-saddle-search'>here</a>.</p>

<hr> <!-- This is the section separator -->

<h2 id="section3" style="font-size: 18px; font-weight: bold;">• Pseudo-magnetism in the slowly-strained discrete honeycomb lattice</h2>

<p>Honeycomb lattices, underlying 2D materials like graphene, possess special points in their band structures known as <em>Dirac points</em>, where two dispersion surfaces intersect conically . Near these points, the electronic or wave dynamics are governed by an effective two-dimensional Dirac operator. The fact that wavepackets evolve under these effective dynamics is key to understanding the remarkable electronic properties of graphene and selected materials.</p>

<p>In photonic crystals, a remarkable feature arises when the lattice is strained: slowly-varying non-uniform deformations generate effective pseudo-magnetic potentials that alter the band structure and, in turn, the wave propagation. In particular, the slowly-varying quadratic displacement is predicted to generate a Landau gauge for a constant magnetic field. This, in turn, gives rise to <em>Landau levels</em>, which appear in the band structure as flat energy bands. Flat bands imply vanishing group velocity; wavepackets supported on them remain localized rather than spreading, with their energy effectively trapped in the lattice. This phenomenon has been confirmed experimentally.</p>

<p>Motivated by observations in photonic strained honeycomb lattices, we analyze slowly strained honeycomb lattices within a discrete tight-binding model. We use a formal discrete multiscale expansion and derive an effective 2D magnetic Dirac operator for general deformations, which agrees with predictions from the photonic and electronic settings. We also prove the first rigorous convergence result of the discrete multiscale expansion for truncated Landau-gauge deformations with bounded gradients.</p>

<table align="center">
    <tr>
        <!-- A big figure that takes a whole line -->
        <td>
            <figure>
                <img src="/assets/img/landau-level.png" alt="landau-level" width="770">
                <figcaption>
                    <center>Honeycomb structure with Dirac points in the band structure and deformed honeycomb with Landau levels.</center>
                </figcaption>
            </figure>
        </td>
    </tr>
</table>


<p>This is a joint work with <a href='https://www.columbia.edu/~miw2103/'>Michael I. Weinstein</a>.</p>


