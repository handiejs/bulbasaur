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

    children.unshift(createNode(h, 'Option', { props: { label: '全部', value: '' } }));

    return h(
      getControl('Select'),
      {
        props: { value: this.internalValue, placeholder: this.getPlaceholder() },
        on: { change: this.onChange },
      },
      children,
    );
  }

  protected created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
