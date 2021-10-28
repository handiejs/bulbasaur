import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectValue, getControl, createNode } from 'handie-vue';
import { RelationFilterHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditM2oFilterWidget extends RelationFilterHeadlessWidget<ObjectValue> {
  private options: any[] = [];

  private render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      createNode(h, 'Option', {
        props: { label: opt[this.labelKey], value: opt[this.valueKey] },
      }),
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
        on: { change: value => this.onChange(value == null ? '' : value) },
      },
      children,
    );
  }

  protected created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
