# CvBreadcrumb

A Vue implementation of a Carbon Components breadcrumb

http://www.carbondesignsystem.com/components/breadcrumb/code

## Usage

```html
<cv-breadcrumb no-trailing-slash>
  <cv-breadcrumb-item>Abc</cv-breadcrumb-item>
  <cv-breadcrumb-item>Def</cv-breadcrumb-item>
  <cv-breadcrumb-item>ghi</cv-breadcrumb-item>
</cv-breadcrumb>
```

Often used with breadcrumbs or other controls

```html
<cv-breadcrumb no-trailing-slash>
  <cv-breadcrumb-item>
    <cv-breadcrumb href="#outer">outer-breadcrumb</cv-breadcrumb>
  </cv-breadcrumb-item>
  <cv-breadcrumb-item>
    <cv-breadcrumb href="#outer">parent-breadcrumb</cv-breadcrumb>
  </cv-breadcrumb-item>
  <cv-breadcrumb-item>
    <cv-text value="name of thing"></cv-text>
  </cv-breadcrumb-item>
</cv-breadcrumb>
```

## Attributes

aria-label: changes the breadcrumb aria label
no-trailing-slash: if true no trailing slash follows the last breadcrumb item

## Item attributes

active: is the active or current location
