{% extends 'layout.swig' %}

{% block content %}
<div class="packages">
  {% for package in packages %}
  <div class="package">
      <header class="package__header">
        <h1 class="package__name">{{ package.name | replace("^@unumux/", "")}}</h1>
        <h2 class="package__version">{{ package["dist-tags"].latest }} </h2>
      </header>
      <div class="package__main">
        {{ package.description }}
      </div>
      <footer class="package__links">
        <span class="package__last-published">Published {{ package.time.modified | timeago }}</span>
        <a href="https://github.com/{{ package.name | replace('^@', '')}}" target="_blank" class="package__github">Github</a>
        <a href="https://www.npmjs.com/package/{{ package.name }}" target="_blank" class="package__npm">NPM</a>
      </footer>
  </div>
  {% endfor %}
</div>
{% endblock %}
