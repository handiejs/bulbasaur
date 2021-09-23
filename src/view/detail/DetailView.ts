import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getRenderer } from '../../../../vendors/handie';

import { ObjectViewHeadlessWidget } from '../../../headless';

@Component
export default class DetailViewWidget extends ObjectViewHeadlessWidget {
  private get id() {
    return this.$route.params.id || '';
  }

  protected created(): void {
    const ctx = this.context;

    if (this.id && ctx.getOne) {
      ctx.getOne(this.id, data => {
        this.dataSource = data;
        this.context.setValue(data);
      });
    }
  }

  private render(h: CreateElement): VNode {
    return h('div', { staticClass: 'DetailView' }, [
      h(getRenderer('FormRenderer'), {
        props: { fields: this.fields, value: this.value, readonly: true, config: this.config },
      }),
    ]);
  }
}
