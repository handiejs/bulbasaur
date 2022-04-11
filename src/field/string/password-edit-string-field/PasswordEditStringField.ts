import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { isNumber, getControl } from 'handie-vue';
import { StringFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class PasswordEditStringFieldWidget extends StringFieldStructuralWidget {
  public render(h: CreateElement): VNode {
    const props: Record<string, any> = {
      value: this.value,
      placeholder: this.getPlaceholder(),
      disabled: this.disabled,
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

    return h(getControl('Password'), { props, on: { input: this.onChange } });
  }
}
