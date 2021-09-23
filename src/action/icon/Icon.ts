import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { omit, getControl } from '../../../../vendors/handie';

import { ActionHeadlessWidget } from '../../../headless';

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

    return h(getControl('Icon'), {
      class: classNames,
      props,
      on: { click: () => this.onExecute() },
    });
  }
}
