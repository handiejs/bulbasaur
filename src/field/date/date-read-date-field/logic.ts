import { Component } from 'vue-property-decorator';

import { DateValue } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DateReadDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }
}
