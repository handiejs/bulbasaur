import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl } from 'handie-vue';
import { StringField } from '@handie/runtime-core/dist/types/input';
import { StringFilterStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class InputStringFilterWidget extends StringFilterStructuralWidget {
  public render(h: CreateElement): VNode {
    const props: Record<string, any> = { value: this.value, placeholder: this.getPlaceholder() };

    if (this.config.className) {
      props.className = this.config.className;
    }

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.filter as StringField;

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
