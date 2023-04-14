import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

import type { HeadlessFormBlock, UserData } from './types';
import type { ToucanFormTextareaFieldComponentSignature as BaseTextareaFieldSignature } from '@crowdstrike/ember-toucan-core/components/form/fields/textarea';
import type { FormData, FormKey, ValidationError } from 'ember-headless-form';

type ComponentArguments<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> = Omit<BaseTextareaFieldSignature['Args'], 'error' | 'value' | 'onChange'> & {
  /**
   * The name of your field, which must match a property of the `@data` passed to the form
   */
  name: KEY;

  /*
   * @internal
   */
  form: HeadlessFormBlock<DATA>;
};

export interface ToucanFormTextareaFieldComponentSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: HTMLTextAreaElement;
  Args: ComponentArguments<DATA, KEY>;
  Blocks: {
    default: [];
  };
}

export default class ToucanFormTextareaFieldComponent<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<ToucanFormTextareaFieldComponentSignature<DATA, KEY>> {
  mapErrors = (errors?: ValidationError[]) => {
    if (!errors) {
      return;
    }

    // @todo we need to figure out what to do when message is undefined
    return errors.map((error) => error.message ?? error.type);
  };

  @action
  assertString(value: unknown): string | undefined {
    assert(
      `Only string values are expected for ${String(
        this.args.name
      )}, but you passed ${typeof value}`,
      typeof value === 'undefined' || typeof value === 'string'
    );

    return value;
  }
}