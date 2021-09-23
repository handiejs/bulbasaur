import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectValue, getControl } from '../../../../vendors/handie';

import { RelationFilterHeadlessWidget } from '../../../headless';

@Component
export default class SelectEditM2oFilterWidget extends RelationFilterHeadlessWidget<ObjectValue> {
  private options: any[] = [];

  private render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      h(getControl('Option'), {
        props: { label: opt[this.labelKey], value: opt[this.valueKey] },
      }),
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

  protected created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
