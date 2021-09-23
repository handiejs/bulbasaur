import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl } from 'handie-vue';
import { StringField } from 'handie-vue/dist/vendors/handie/types/input';
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

    const attrs: Record<string, any> = {
      placeholder: this.getPlaceholder(),
      rows: this.config.rows || this.getBehavior('rows'),
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.field as StringField;

      if (isNumber(min)) {
        attrs.minlength = min;
      }

      if (isNumber(max)) {
        attrs.maxlength = max;
      }
    }

    return h(getControl('Input'), {
      props: {
        type: 'textarea',
        value: this.value,
        resize: 'none',
        showWordLimit,
      },
      attrs,
      on: { input: this.onChange },
    });
  }
}
