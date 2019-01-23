# CvLink

A Vue implementation of a Carbon Components link

http://www.carbondesignsystem.com/components/link/code

## Usage

### <a></a>

```html
<cv-link href="/about">About</cv-link>
```

### <router-link></router-link>

Router links are preferred if vue-router is used, simply supply a 'to' instead of a 'href'

```html
<cv-link to="/about">About</cv-link>
```

### Disabled

A link will show as disabled if aria-disabled is true

```html
<cv-link href="#" tabindex="-1" aria-disabled="true"> Disabled link </cv-link>
```

## Attributes

Standard HTML for a <a> or <router-link>
