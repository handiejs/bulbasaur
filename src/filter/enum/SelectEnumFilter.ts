import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl, createNode } from 'handie-vue';
import { EnumFilterHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditEnumFilterWidget extends EnumFilterHeadlessWidget {
  private render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      createNode(h, 'Option', { props: { label: opt.label, value: opt.value } }),
    );

    const showEmptyValueOption = this.getCommonBehavior('filter.showEmptyValueOption', false);

    if (showEmptyValueOption) {
      children.unshift(
        createNode(h, 'Option', {
          props: { label: this.getCommonBehavior('filter.emptyValueOptionLabel'), value: '' },
        }),
      );
    }

    return h(
      getControl('Select'),
      {
        props: {
          value: this.internalValue,
          placeholder: this.getPlaceholder(),
          clearable: !showEmptyValueOption,
        },
        on: {
          change: value => this.onChange(value == null ? '' : value),
        },
      },
      children,
    );
  }
}
