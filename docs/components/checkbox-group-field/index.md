# Checkbox Group Field

Provides a checkbox group to be used within forms. It yields [CheckboxFields](./checkbox-field) back to the consumer so they can render as many checkboxes as needed with built-in state tracking for the selected values.

## Yielded Items

- `CheckboxField`: An underlying [CheckboxField](./checkbox-field) component. All arguments and attributes of CheckboxField can be supplied (e.g., `@isDisabled`, `@hint`, etc.). To give each option a unique value, use the `@option` argument.

## Label

Provide a string to `@label` to render the text into the `<legend>` of the fieldset.

## Hint

Provide a string to `@hint` to render the text into the Hint section of the fieldset. This is optional.

## Error

Provide a string to `@error` to render the text into the Error section of the fieldset. This is optional.

## Value and onChange

To tie into the input event when a checkbox is clicked, provide `@onChange`. `@onChange` will return two arguments:

1. an array containing the selected values
2. the raw event object

A `@value` argument to the CheckboxGroupField is used to determine which of the checkboxes is currently selected. It does so by comparing `@value` to each `@option` of the checkbox. When an `@onChange` event occurs, it's most common to update the `@value` argument to the newly selected values as shown in the example below.

```hbs
<Form::CheckboxGroupField
  @label='Label'
  @name='options'
  @value={{this.groupValue}}
  @onChange={{this.updateValue}}
  as |group|
>
  <group.CheckboxField @label='Option 1' @option='option-1' />
  <group.CheckboxField @label='Option 2' @option='option-2' />
</Form::CheckboxGroupField>
```

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked groupValue = [];

  @action
  updateValue(value) {
    this.groupValue = value;
  }
}
```

## Disabled State

### Fieldset

To disable the fieldset and all child checkboxes, set the `@isDisabled` argument directly on the checkbox group field.

```hbs
<Form::CheckboxGroupField
  @label='Label'
  @name='options'
  @value={{this.groupValue}}
  @onChange={{this.updateValue}}
  @isDisabled={{true}}
  as |group|
>
  <!-- This will now be disabled as well! -->
  <group.CheckboxField @label='Option 1' @value='option-1' />
</Form::CheckboxGroupField>
```

### Individual Checkboxes

To disable individual checkbox fields, set the `@isDisabled` argument directly on the checkbox field.

```hbs
<Form::CheckboxGroupField
  @label='Label'
  @name='options'
  @value={{this.groupValue}}
  @onChange={{this.updateValue}}
  as |group|
>
  <group.CheckboxField
    @label='Option 1'
    @option='option-1'
    @isDisabled={{true}}
  />
</Form::CheckboxGroupField>
```

## Attributes and Modifiers

Consumers have direct access to the underlying [checkbox element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), so all attributes are supported. Modifiers can also be added directly to individual radio fields.

## All UI States

<div class="flex flex-col space-y-4" style="max-width: 14rem">
<Form::CheckboxGroupField
  @label='Label'
  @name='options-a'
  as |group|
>
  <group.CheckboxField @label='Option 1' @option='option-1' />
  <group.CheckboxField @label='Option 2' @option='option-2'/>
  <group.CheckboxField @label='Option 3' @option='option-3'/>
  <group.CheckboxField @label='Option 4' @option='option-4'/>
</Form::CheckboxGroupField>

<Form::CheckboxGroupField @label="Label" @name="options-b" @hint="Select an option" as |group|>
<group.CheckboxField @label="Option 1" @option="option-1" />
<group.CheckboxField @label="Option 2" @option="option-2" />
<group.CheckboxField @label="Option 3" @option="option-3" />
</Form::CheckboxGroupField>

<Form::CheckboxGroupField @label="Label" @name="options-c" @error="With error" as |group|>
<group.CheckboxField @label="Option 1" @option="option-1" />
<group.CheckboxField @label="Option 2" @option="option-2" />
<group.CheckboxField @label="Option 3" @option="option-3" />
</Form::CheckboxGroupField>

<Form::CheckboxGroupField @label="Label" @name="options-d" @hint="Select an option" @error="With error" as |group|>
<group.CheckboxField @label="Option 1" @option="option-1" />
<group.CheckboxField @label="Option 2" @option="option-2" />
<group.CheckboxField @label="Option 3" @option="option-3" />
</Form::CheckboxGroupField>

<Form::CheckboxGroupField @label="Label" @name="disabled" @hint="With disabled" @isDisabled={{true}} as |group|>
<group.CheckboxField @label="Option 1" @option="option-1" />
<group.CheckboxField @label="Option 2" @option="option-2" />
<group.CheckboxField @label="Option 3" @option="option-3" />
</Form::CheckboxGroupField>

</div>