import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl } from 'handie-vue';
import { StringField } from 'handie-vue/dist/vendors/handie/types/input';
import { TextFilterHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class InputTextFilterWidget extends TextFilterHeadlessWidget {
  private render(h: CreateElement): VNode {
    const props: Record<string, any> = { value: this.value, placeholder: this.getPlaceholder() };

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
