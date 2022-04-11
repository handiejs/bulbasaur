import { ViewWidgetConfig } from 'handie-vue';

interface FormViewWidgetBehaviors {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

interface FormViewWidgetConfig extends ViewWidgetConfig {
  readonly actionBarOutside?: boolean;
  readonly actionBarAlignment?: 'left' | 'center' | 'right';
}

export { FormViewWidgetBehaviors, FormViewWidgetConfig };
