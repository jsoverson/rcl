---
layout: page
title: iog - Versatile JavaScript Logging
tagline:
---
{% include JB/setup %}

{% for post in site.posts reversed %}
  <article class='documentation'>
  <h2>{{ post.title }}</h2>
  <section>
    {{ post.content | markdownify }}
  </section>
  </article>
{% endfor %}


