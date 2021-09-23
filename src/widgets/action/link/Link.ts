import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { omit, getControl } from 'handie-vue';
import { ActionHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class LinkActionWidget extends ActionHeadlessWidget {
  private render(h: CreateElement): VNode {
    const classNames: string[] = ['ActionWidget', 'LinkActionWidget'];

    if (this.config.className) {
      classNames.push(this.config.className);
    }

    return h(
      getControl('Link'),
      {
        class: classNames,
        props: omit(this.config, ['showIcon', 'iconOnly', 'icon']),
        on: { click: () => this.onExecute() },
      },
      this.resolveContent(),
    );
  }
}
