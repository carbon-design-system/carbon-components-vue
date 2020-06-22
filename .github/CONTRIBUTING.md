## Read these standards

- All component names should use the prefix cv but otherwise match the carbon component name.
- All component names should be upper camel cased, with capital first letter and start with the common prefix `Cv`.
- All components names must be kebab cased when used in HTML and start with the prefix `cv`.
- All custom properties should be lower camel cased and start with the prefix `cv`.
- All custom properties must be kebab cased when used in HTML and start with the prefix `cv`.
- Existing HTML attributes should not be defined as properties unless they are being used by the component.
- Where existing HTML attributes are required as properties they should not have the `cv` prefix added.
- Where the target for existing HTML attributes is not the outer element assign as per https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
- Relys on core carbon CSS, do not import.
- All components must have one or more stories that demonstrate all abilities of the component.
  - Stories should declare knobs/actions and use the `sv-template-view` wrapper until a suitable plugin exists.
- Existing HTML attributes/events should not be coopted for other purposes.
- Do not add a dependency on core javascript.
- Do create multiple components where they make semantic sense e.g. `cv-list` and `cv-item`, or `cv-menu` and `cv-menu-item`.
- Do capture and re-throw existing events (including from carbon components) where they have a clear need beyond the template. E.g. A button click.
- Do not capture and re-throw all possible events e.g. `focus`, `mouseOver` etc. Users can make use of `.native` for these, see https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components
- Where an id is required use `uidMixin` which will generate an ID if none is supplied.
- Log all raised events as actions in the story.

## Add a complete component

Components consist of a folder with the following

1. At least one single file component .vue file
2. A storybook story, following the existing pattern
3. A notes file detialing usage especially where it might differ from core carbon, or be Vue specific.
4. An entry in the README file table noting the components status.
