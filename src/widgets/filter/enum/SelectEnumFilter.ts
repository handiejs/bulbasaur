import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { EnumFilterHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditEnumFilterWidget extends EnumFilterHeadlessWidget {
  private render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      h(getControl('Option'), { props: { label: opt.label, value: opt.value } }),
    );

    children.unshift(h(getControl('Option'), { props: { label: '全部', value: '' } }));

    return h(
      getControl('Select'),
      {
        props: { value: this.internalValue, placeholder: this.getPlaceholder() },
        on: { change: this.onChange },
      },
      children,
    );
  }
}
