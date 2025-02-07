---
layout: default
excludeSearch: true
---

<div class="sorting-controls">
  <label>
    <span class="reset">Reset</span>
  </label>
</div>

{% include extensions %}
{% include developers %}

<div class="sorter-checkboxes">
    {% assign devs = "" | split:"|" %}
    {% for item in developers %}
        {% assign devs = devs | push: item %}
    {% endfor %}
    {% assign devs = devs | uniq | sort %}
    <div>
    {% for developer in devs %}
      <label class="sorter-checkbox">
        <input type="checkbox" id="{{ developer | slugify }}" value="{{ developer | slugify }}"><span>{{ developer }}</span>
      </label>
    {% endfor %}
    </div>
    {% assign tags = "" | split:"|" %}
    {% for item in extensions %}
        {% for tag in item.tags %}
            {% assign tags = tags | push: tag %}
        {% endfor %}
    {% endfor %}
    {% assign tags = tags | uniq | sort %}
    <div>
    {% for tag in tags %}
        <label class="sorter-checkbox">
            <input type="checkbox" id="{{ tag }}" value="{{ tag }}"><span>{{ tag }}</span>
        </label>
    {% endfor %}
    </div>
</div>

<div class="sorter">
{% for item in extensions %}
{% assign filters = "" | split:"|" %}
{% for tag in item.tags %}
  {% assign filters = filters | push: tag %}
{% endfor %}
{% assign developer = item.developer | slugify %}
{% assign filters = filters | push: developer %}
<div class="sorter-item" data-title="{{ item.name }}" data-groups='["{{ filters | join: '", "'}}"]'>
  <div class="sorter-item-inner">
    <div class="sorter-column sorter-item-title">
      <a href="{{ item.url }}">{{ item.name }}</a>
    </div>
    <div class="sorter-column sorter-item-developer">
      {{ item.developer }}
    </div>
    <div class="sorter-column sorter-item-description">
      {{ item.description }}
    </div>
    <div class="sorter-column sorter-item-tags">
      {% for tag in item.tags %}
        <div class="tag">{{ tag }}</div>
      {% endfor %}
    </div>
  </div>
</div>
{% endfor %}
</div>

<script src="{{ site.baseurl }}/js/shuffle.min.js"></script>
<script type="text/javascript">
var Shuffle = window.Shuffle
var element = document.querySelector('.sorter')

var shuffleInstance = new Shuffle(element, {
  itemSelector: '.sorter-item',
  useTransforms: false,
  speed: 0,
  staggerAmount: 0,
})
shuffleInstance.layout()

function filterItems() {
    values = []
    $(".sorter-checkbox :checked").each(function () {
        values.push($(this).val())
    })
    shuffleInstance.filter(values)
    return values
}

$(".sorter-checkbox").click(function() {
    selected = filterItems()
    if (selected.length) {
        window.location.hash = "#" + selected.join("&")
    }
    else {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }


})

activeTags = window.location.hash.replace("#", "").split("&")

found = 0
for (i = 0; i < activeTags.length; i++) {
    tag = $("#" + decodeURIComponent(activeTags[i]))
    if ( tag.length ) {
        tag.prop('checked', true)
        found = tag
    }
}
if ( found ) {
    filterItems()
}

$(".reset").click(function () {
    $(".sorter-checkbox :checked").each(function () {
        this.checked = false
    })
    shuffleInstance.filter()
    history.pushState("", document.title, window.location.pathname + window.location.search);
})
</script>
