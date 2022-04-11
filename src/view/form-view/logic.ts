import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectViewWidgetState, isBoolean, capitalize, getControl } from 'handie-vue';
import { FormViewStructuralWidget } from 'handie-vue/dist/widgets';

import { FormViewWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

@Component
export default class FormViewWidget extends FormViewStructuralWidget<
  ObjectViewWidgetState,
  FormViewWidgetConfig
> {
  private isActionBarOutside(): boolean {
    if (isBoolean(this.config.actionBarOutside)) {
      return this.config.actionBarOutside!;
    }

    return isBoolean(this.getBehavior('actionBarOutside'))
      ? this.getBehavior('actionBarOutside')
      : this.getCommonBehavior('view.objectViewActionBarOutside', false);
  }

  private resolveActionBarAlignment(): 'left' | 'center' | 'right' {
    if (this.config.actionBarAlignment) {
      return this.config.actionBarAlignment;
    }

    return (
      this.getBehavior('actionBarAlignment') ||
      this.getCommonBehavior('view.objectViewActionBarAlignment', 'left')
    );
  }

  public created(): void {
    this.setBehaviors('view.form', defaultBehaviors);
    this.fetchData();
  }

  public render(h: CreateElement): VNode {
    const outside = this.isActionBarOutside();
    const actionBar = this.renderActionBar(this.$style['FormViewWidget-actionBar']);

    return h(
      getControl('Wait'),
      {
        props: {
          className: [
            this.$style.FormViewWidget,
            this.$style[`FormViewWidget--actionBar${capitalize(this.resolveActionBarAlignment())}`],
            { [this.$style['FormViewWidget--actionBarOutside']]: outside },
            this.config.className,
          ],
          busy: this.loading,
        },
      },
      outside
        ? [
            h('div', { class: this.$style['FormViewWidget-formContainer'] }, [
              this.renderForm({ className: this.$style['FormViewWidget-form'] }),
            ]),
            actionBar,
          ]
        : [
            this.renderForm({
              className: this.$style['FormViewWidget-form'],
              children: [actionBar],
            }),
          ],
    );
  }
}
