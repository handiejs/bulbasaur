import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, isFunction, pick, getControl } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DateTimeEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }

  public render(h: CreateElement): VNode {
    const { disableDate, showNow } = pick(this.config, ['disableDate', 'showNow']) as Record<
      string,
      any
    >;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) => disableDate(this.value, date, this.$$view.getValue());
    }

    return h(getControl('DateTimePicker'), {
      props: {
        value: this.value,
        placeholder: this.getPlaceholder(),
        disabled: this.disabled,
        format: this.getDisplayFormat(),
        pickerOption: options,
      },
      on: { change: (_, date) => this.onDateChange(date) },
    });
  }
}
