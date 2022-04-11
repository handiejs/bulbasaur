import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { TextFieldWidgetState, isNumber, getControl } from 'handie-vue';
import { TextFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { TextareaTextFieldWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

@Component
export default class TextareaEditTextFieldWidget extends TextFieldStructuralWidget<
  TextFieldWidgetState,
  TextareaTextFieldWidgetConfig
> {
  public created(): void {
    this.setBehaviors('field.textarea', defaultBehaviors);
  }

  public render(h: CreateElement): VNode {
    let showWordLimit = this.config.showWordLimit;

    if (showWordLimit === undefined) {
      showWordLimit = this.getBehavior('showWordLimit');
    }

    const props: Record<string, any> = {
      value: this.value,
      placeholder: this.getPlaceholder(),
      rows: this.config.rows || this.getBehavior('rows'),
      resize: 'none',
      disabled: this.disabled,
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.field as StringField;

      if (isNumber(min)) {
        props.minLength = min;
      }

      if (isNumber(max)) {
        props.maxLength = max;
        props.showWordage = showWordLimit;
      }
    }

    return h(getControl('TextArea'), { props, on: { input: this.onChange } });
  }
}
