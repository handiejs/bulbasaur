import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, getControl, getRenderer } from 'handie-vue';
import { SearchHeadlessWidget } from 'handie-vue/dist/widgets';

import defaultBehaviors from './behavior';

@Component
export default class FormSearchWidget extends SearchHeadlessWidget {
  private resolveLabelWidth(): string {
    const labelWidth = this.getBehavior('formControlLabelWidth');

    return isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
  }

  private handleSearch(evt: any): void {
    this.submit();

    if (evt) {
      evt.preventDefault();
    }
  }

  protected created(): void {
    this.setBehaviors('search.form', defaultBehaviors);
    this.initCondition();
  }

  private render(h: CreateElement): VNode {
    const formControlSize = this.getBehavior('formControlSize');

    const formChildren: VNode[] = [];

    this.filters.forEach(filter => {
      if (filter.hidden) {
        return;
      }

      formChildren.push(
        h(getControl('FormField'), { props: { label: filter.label } }, [
          h(getRenderer('FilterRenderer'), {
            props: { filter, value: this.condition[filter.name] },
            on: { change: this.setFilterValue },
          }),
        ]),
      );
    });

    const standalone = this.getBehavior('actionsStandalone') === true;
    const buttonProps: Record<string, any> = {
      className: 'FormSearch-button',
      size: formControlSize,
      nativeType: standalone ? 'button' : 'submit',
    };

    if (this.getBehavior('submitButtonAsPrimary') === true) {
      buttonProps.color = 'primary';
    }

    const buttons: VNode[] = [
      h(getControl('Button'), { props: buttonProps, on: { click: this.handleSearch } }, '查询'),
    ];

    if (this.getBehavior('resettable') === true) {
      buttons.push(
        h(
          getControl('Button'),
          {
            props: { className: 'FormSearch-button', size: formControlSize },
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

    const buttonGroup: VNode = h(
      'div',
      { staticClass: 'FormSearch-buttonGroup', class: { 'is-standalone': standalone } },
      buttons,
    );

    formChildren.push(
      standalone
        ? h('div', { staticStyle: { display: 'none' } }, [
            h(
              getControl('Button'),
              {
                props: { nativeType: 'submit' },
                on: { click: this.handleSearch },
              },
              '替身查询',
            ),
          ]) // for submission when the Enter key pressed
        : buttonGroup,
    );

    const form = h(
      getControl('Form'),
      {
        props: {
          value: this.condition,
          controlSize: formControlSize,
          layout: this.getBehavior('formLayout'),
          labelOption: { width: this.resolveLabelWidth() },
        },
      },
      formChildren,
    );

    return h('div', { staticClass: 'FormSearch' }, standalone ? [form, buttonGroup] : [form]);
  }
}
