import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl, createNode } from 'handie-vue';
import { EnumFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditEnumFieldWidget extends EnumFieldStructuralWidget {
  public render(h: CreateElement): VNode {
    return h(
      getControl('Select'),
      {
        props: {
          value: this.value,
          placeholder: this.getPlaceholder(),
          clearable: !this.field.required,
          disabled: this.disabled,
        },
        on: { change: this.onChange },
      },
      this.options.map(opt =>
        createNode(h, 'Option', {
          props: { label: opt.label, value: opt.value, disabled: opt.disabled },
          key: `Option${opt.value}OfSelectEditEnumFieldWidget`,
        }),
      ),
    );
  }
}
