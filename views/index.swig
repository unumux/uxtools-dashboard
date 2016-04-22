{% extends 'layout.swig' %}

{% block content %}
<div class="packages">
  {% for package in packages %}
  <div class="package">
      <h1>{{ package.name }}</h1>
      <h2>{{ package.version }} </h2>
  </div>
  {% endfor %}
</div>
{% endblock %}
