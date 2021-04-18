# CvForm

These components are purely wrapper elements for use in creating forms.

## Usage CvForm

CvForm has no properties and a single default slot

```html
<cv-form>
  <!-- form content -->
  <button>OK</button>
</cv-form>
```

## Usage CvFormGroup

Used inside a form to group components such as checkboxes and radio buttons.

```html
<cv-form-group noMargin invalid message="Optional text message">
  <template slot="label">Form group legend</template>
  <template slot="content">
    <label> Small <input type="radio" name="size" id="size_1" value="small" /> </label>
    <label> Large <input type="radio" name="size" id="size_2" value="large" /> </label>
  </template>
</cv-form-group>
```

## Usage CvFormItem

Used inside a form to provide positional styling.

```html
<cv-form-item>
  <label for="text-input-3" :class="`bx--label`">Text Input label</label>
  <input id="text-input-3" type="text" :class="`bx--text-input`" placeholder="Optional placeholder text" />
</cv-form-item>
```
