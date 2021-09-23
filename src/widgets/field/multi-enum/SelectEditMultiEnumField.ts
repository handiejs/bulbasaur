import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { MultiEnumFieldHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditMultiEnumFieldWidget extends MultiEnumFieldHeadlessWidget {
  private render(h: CreateElement): VNode {
    return h(
      getControl('Select'),
      {
        props: {
          value: this.internalValue,
          placeholder: this.getPlaceholder(),
          multiple: true,
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
