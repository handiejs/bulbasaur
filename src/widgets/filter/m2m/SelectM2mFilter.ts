import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ListValue, isBoolean, getControl, createNode } from 'handie-vue';
import { RelationFilterHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditM2mFilterWidget extends RelationFilterHeadlessWidget<ListValue> {
  private options: any[] = [];

  private render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      createNode(h, 'Option', {
        props: { label: opt[this.labelKey], value: opt[this.valueKey] },
      }),
    );

    const multiple = isBoolean(this.config.multiple) ? this.config.multiple : true;

    children.unshift(
      createNode(h, 'Option', { props: { label: '全部', value: multiple ? [] : '' } }),
    );

    return h(
      getControl('Select'),
      {
        props: {
          value: this.internalValue,
          placeholder: this.getPlaceholder(),
          multiple,
        },
        on: { change: this.onChange },
      },
      children,
    );
  }

  protected created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
