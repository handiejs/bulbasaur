import { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import { FloatFieldWidgetConfig } from 'handie-vue';

interface NumberFloatFieldWidgetConfig extends FloatFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

export { NumberFloatFieldWidgetConfig };
