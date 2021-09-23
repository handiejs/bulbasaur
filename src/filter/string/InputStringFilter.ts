import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl } from '../../../../vendors/handie';
import { StringField } from '../../../../vendors/handie/types/input';

import { StringFilterHeadlessWidget } from '../../../headless';

@Component
export default class InputStringFilterWidget extends StringFilterHeadlessWidget {
  private render(h: CreateElement): VNode {
    const attrs: Record<string, any> = { placeholder: this.getPlaceholder() };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.filter as StringField;

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
