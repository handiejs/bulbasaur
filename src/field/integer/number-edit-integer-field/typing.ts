import { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import { IntegerFieldWidgetConfig } from 'handie-vue';

interface NumberIntegerFieldWidgetConfig extends IntegerFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

export { NumberIntegerFieldWidgetConfig };
