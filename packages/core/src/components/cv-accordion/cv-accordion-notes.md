# CvAccordion

A Vue implementation of a Carbon Components accordion.

http://www.carbondesignsystem.com/components/accordion/code

## Usage

CvAccordion is used in conjunction with slotted CvAccordionItem components.

```html
<cv-accordion>
  <cv-accordion-item>
    <template slot="title">Section 1 title </template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </cv-accordion-item>
  <cv-accordion-item>
    <template slot="title">Section 2 title</template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </cv-accordion-item>
  <cv-accordion-item>
    <template slot="title">Section 3 title</template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </cv-accordion-item>
  <cv-accordion-item>
    <template slot="title">Section 4 title</template>
    <template slot="content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </template>
  </cv-accordion-item>
</cv-accordion>
```

## Events

CvAccordion

- change: when an accordion item opens or closes

## Attributes

CvAccordion
align: Accordion heading alignment (start, end)
size: default, 'sm' or 'xl'

CvAccordionItem
disabled: accordion item disabled
open: accordion item is open

### Additional

N/A
