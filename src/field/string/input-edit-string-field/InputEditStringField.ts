import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { StringFieldWidgetState, isNumber, getControl } from 'handie-vue';
import { StringFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { InputStringFieldWidgetConfig } from '../typing';

@Component
export default class InputEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  InputStringFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    const props: Record<string, any> = {
      value: this.value,
      placeholder: this.getPlaceholder(),
      disabled: this.disabled,
      prefix: this.config.prefix,
      suffix: this.config.suffix,
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.field as StringField;

      if (isNumber(min)) {
        props.minLength = min;
      }

      if (isNumber(max)) {
        props.maxLength = max;
      }
    }

    return h(getControl('TextInput'), { props, on: { input: this.onChange } });
  }
}
