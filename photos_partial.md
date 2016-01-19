---
layout: page_partial
permalink: /photos_partial.html
title: Photo Gallery
tagline: 
tags: []
modified: 3-16-2014
image:
  feature: website_header_1.jpg
hide_author: true
number_of_images: 47
---

<div class="photo-gallery" magnific-popup-gallery>


{% for i in (1..page.number_of_images) %}

  {% capture image_name %}web_gallery{{ i | pad_zero }}.jpg{% endcapture %}
  {% capture image_url %}{{ site.url }}/images/{{ image_name }}{% endcapture %}

  <div class="image-wrapper">
  <a href="{{ image_url }}"><img src="{{ image_url }}" class="clearfix"></a>  
  </div>
{% endfor %}

</div>