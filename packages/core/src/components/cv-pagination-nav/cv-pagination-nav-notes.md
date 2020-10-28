# cv-pagination-nav

A Vue implementation of a Carbon Components pagination nav

<http://www.carbondesignsystem.com/components/pagination/code>

## Usage

```html
<cv-pagination-nav total-items="10" items-shown="8" allow-loop @change="onChange" page="1"></cv-pagination-nav>
```

## Attributes

- total-items: The total number of items/pages.
- items-shown: The number of items to be shown.
- allow-loop: Whether user should be able to loop through the items when reaching first / last.
- page: The default page

## Events

Change - Contains value - { start, length }
