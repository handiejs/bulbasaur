import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { EnumFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditEnumFieldWidget extends EnumFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    return h(
      getControl('Select'),
      {
        props: {
          value: this.internalValue,
          placeholder: this.getPlaceholder(),
          clearable: !this.field.required,
        },
        on: { change: this.onChange },
      },
      this.options.map(opt =>
        h(getControl('Option'), {
          props: { label: opt.label, value: opt.value, disabled: opt.disabled },
        }),
      ),
    );
  }
}
