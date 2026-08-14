---
layout: page
permalink: /research/
title: Research
description:
nav: true
nav_order: 2
---


<p>My research primarily explores the application of Calculus of Variations and spectral theory in material science, with a particular focus on understanding <i>mechanical metamaterials</i> -- carefully designed materials that exhibit exotic functionalities -- from a mathematical perspective. For an overview of mechanical metamaterials, you can refer to this <a href='https://www.nature.com/articles/natrevmats201766'>Nature review paper</a>.</p>

<p>My current projects can be categorized into the following areas:</p>

<!-- pages/research.md -->
<div class="projects research-projects">
  {%- assign research_projects = site.projects | where: "category", "research" | sort: "importance" -%}
  <div class="grid">
    {%- for project in research_projects -%}
      {% include research_project_card.html %}
    {%- endfor %}
  </div>
</div>
