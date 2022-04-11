import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, isFunction, pick, getControl } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DateEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }

  public render(h: CreateElement): VNode {
    const { disableDate, showNow } = pick(this.config, ['disableDate', 'showNow']) as Record<
      string,
      any
    >;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.getDateValue(), date, this.$$view.getValue());
    }

    return h(getControl('DatePicker'), {
      props: {
        value: this.getDateValue(),
        placeholder: this.getPlaceholder(),
        disabled: this.disabled,
        format: this.getDisplayFormat(),
        pickerOption: options,
      },
      on: { change: (_, date) => this.onDateChange(date) },
    });
  }
}
