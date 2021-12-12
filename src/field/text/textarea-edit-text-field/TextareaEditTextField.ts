import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl } from 'handie-vue';
import { StringField } from '@handie/runtime-core/dist/types/input';
import { TextFieldHeadlessWidget } from 'handie-vue/dist/widgets';

import defaultBehaviors from './behavior';

@Component
export default class TextareaEditTextFieldWidget extends TextFieldHeadlessWidget {
  protected created(): void {
    this.setBehaviors('field.textarea', defaultBehaviors);
  }

  private render(h: CreateElement): VNode {
    let showWordLimit = this.config.showWordLimit;

    if (showWordLimit === undefined) {
      showWordLimit = this.getBehavior('showWordLimit');
    }

    const props: Record<string, any> = {
      value: this.value,
      placeholder: this.getPlaceholder(),
      rows: this.config.rows || this.getBehavior('rows'),
      resize: 'none',
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.field as StringField;

      if (isNumber(min)) {
        props.minLength = min;
      }

      if (isNumber(max)) {
        props.maxLength = max;
        props.wordage = showWordLimit;
      }
    }

    return h(getControl('TextArea'), { props, on: { input: this.onChange } });
  }
}
