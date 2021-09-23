import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl } from 'handie-vue';
import { StringField } from 'handie-vue/dist/vendors/handie/types/input';
import { StringFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class InputEditStringFieldWidget extends StringFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    const attrs: Record<string, any> = { placeholder: this.getPlaceholder() };

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
      props: { value: this.value },
      attrs,
      on: { input: this.onChange },
    });
  }
}
