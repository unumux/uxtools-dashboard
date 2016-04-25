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
        <div class="package__description">
          {{ package.description }}
        </div>
        <ul class="package__stats">
          <li>Last published: {{ package.time.modified | timeago }}</li>        
          <li>Number of versions: {{ Object.keys(package.versions).length }}</li>
          <li>Open issues: <a class="package__issues-link" href="{{ package.ghRepo.html_url }}/issues" target="_blank">{{ package.ghRepo.open_issues }}</a></li>
        </ul>
      </div>
      <footer class="package__links">
        <div class="package__install-cmd">
          <input type="text" readonly value="{{ package.cmd }}" onclick="select()">
        </div>
        <a href="https://github.com/{{ package.name | replace('^@', '')}}" target="_blank" class="package__github">Github</a>
        <a href="https://www.npmjs.com/package/{{ package.name }}" target="_blank" class="package__npm">NPM</a>
      </footer>
  </div>
  {% endfor %}
</div>
{% endblock %}
