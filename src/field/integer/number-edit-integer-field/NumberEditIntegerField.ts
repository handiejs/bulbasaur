import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { NumberField } from '@handie/runtime-core/dist/types/input';
import { IntegerFieldWidgetState, isNumber, isNumeric, getControl } from 'handie-vue';
import { IntegerFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { NumberIntegerFieldWidgetConfig } from './typing';

@Component
export default class NumberEditIntegerFieldWidget extends IntegerFieldStructuralWidget<
  IntegerFieldWidgetState,
  NumberIntegerFieldWidgetConfig
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
      const { min, max } = this.field as NumberField;

      if (isNumber(min)) {
        props.min = min;
      }

      if (isNumber(max)) {
        props.max = max;
      }
    }

    return h(getControl('NumberInput'), {
      props,
      on: { change: value => this.onChange(isNumeric(value) ? parseFloat(value) : value) },
    });
  }
}
