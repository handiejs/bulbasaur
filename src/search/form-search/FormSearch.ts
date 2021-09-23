import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl, getRenderer } from '../../../../vendors/handie';

import { SearchHeadlessWidget } from '../../../headless';
import defaultBehaviors from './behavior';

@Component
export default class FormSearchWidget extends SearchHeadlessWidget {
  private resolveLabelWidth(): string {
    const labelWidth = this.getBehavior('formControlLabelWidth');

    return isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
  }

  protected created(): void {
    this.setBehaviors('search.form', defaultBehaviors);
    this.initCondition();
  }

  private render(h: CreateElement): VNode {
    const formControlSize = this.getBehavior('formControlSize');

    const formChildren: VNode[] = this.filters.map(filter =>
      h(getControl('FormItem'), { props: { label: filter.label } }, [
        h(getRenderer('FilterRenderer'), {
          props: { filter, value: this.condition[filter.name] },
          on: { change: this.setFilterValue },
        }),
      ]),
    );

    const buttonProps: Record<string, any> = { size: formControlSize };

    if (this.getBehavior('submitButtonAsPrimary') === true) {
      buttonProps.color = 'primary';
    }

    const buttons: VNode[] = [
      h(
        getControl('Button'),
        {
          staticClass: 'FormSearch-button',
          props: buttonProps,
          on: {
            click: evt => {
              this.submit();
              evt.preventDefault();
            },
          },
        },
        '查询',
      ),
    ];

    if (this.getBehavior('resettable') === true) {
      buttons.push(
        h(
          getControl('Button'),
          {
            staticClass: 'FormSearch-button',
            props: { size: formControlSize },
            on: {
              click: evt => {
                this.reset();
                evt.preventDefault();
              },
            },
          },
          '重置',
        ),
      );
    }

    const standalone = this.getBehavior('actionsStandalone') === true;
    const buttonGroup: VNode = h(
      'div',
      { staticClass: 'FormSearch-buttonGroup', class: { 'is-standalone': standalone } },
      buttons,
    );

    if (!standalone) {
      formChildren.push(buttonGroup);
    }

    const form = h(
      getControl('Form'),
      {
        props: {
          model: this.condition,
          size: formControlSize,
          inline: this.getBehavior('formLayout') === 'inline',
          labelWidth: this.resolveLabelWidth(),
        },
      },
      formChildren,
    );

    return h('div', { staticClass: 'FormSearch' }, standalone ? [form, buttonGroup] : [form]);
  }
}
