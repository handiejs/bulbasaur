import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { omit, getControl } from 'handie-vue';
import { ActionHeadlessWidget } from 'handie-vue/dist/widgets';

@Component
export default class IconActionWidget extends ActionHeadlessWidget {
  private render(h: CreateElement): VNode {
    const props = omit(this.config, ['showIcon', 'iconOnly', 'icon', 'refs']);
    const classNames: string[] = ['ActionWidget', 'IconActionWidget'];

    const { icon, className } = this.config;

    if (icon) {
      props.refs = icon;
    }

    const { primary, danger } = this.action;

    if (primary) {
      classNames.push('IconActionWidget--primary');
    }

    if (danger) {
      classNames.push('IconActionWidget--danger');
    }

    if (className) {
      classNames.push(className);
    }

    props.className = classNames.join(' ');

    return h(getControl('Icon'), { props, on: { click: () => this.onExecute() } });
  }
}
