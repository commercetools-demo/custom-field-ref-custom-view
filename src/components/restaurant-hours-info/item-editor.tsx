import { useState } from 'react';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import TextInput from '@commercetools-uikit/text-field';
import NumberField from '@commercetools-uikit/number-field';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Checkbox from '@commercetools-uikit/checkbox-input';
import FieldLabel from '@commercetools-uikit/field-label';
type ItemEditorProps = {
  hours: {
    id: string;
    obj?: {
      key: string;
      container: string;
      value?: {
        name?: string;
        startTime?: string;
        endTime?: string;
        hasSpclHours?: boolean;
        hasSpclHoursMsg?: boolean;
        dayOfWeek?: number;
        endDayOfWeek?: number;
        hideRestHours?: boolean;
        hourCode?: string;
      };
    };
  };
  onSave?: (hours: ItemEditorProps['hours']) => Promise<void>;
  onCancel?: () => void;
};

const ItemEditor = (props: ItemEditorProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { hours, onSave, onCancel } = props;
  const [formData, setFormData] = useState({
    name: hours.obj?.value?.name || '',
    startTime: hours.obj?.value?.startTime || '',
    endTime: hours.obj?.value?.endTime || '',
    hasSpclHours: hours.obj?.value?.hasSpclHours || false,
    hasSpclHoursMsg: hours.obj?.value?.hasSpclHoursMsg || false,
    dayOfWeek: hours.obj?.value?.dayOfWeek || 0,
    endDayOfWeek: hours.obj?.value?.endDayOfWeek || 0,
    hideRestHours: hours.obj?.value?.hideRestHours || false,
    hourCode: hours.obj?.value?.hourCode || '',
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.checked,
    });
  };

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      await onSave({
        ...hours,
        obj: {
          ...hours.obj,
          value: formData,
        },
      });
      setIsSaving(false);
    }
  };

  return (
    <Spacings.Stack scale="m">
      <TextInput
        title="Name"
        value={formData.name}
        onChange={handleChange('name')}
      />
      <TextInput
        title="Start Time"
        value={formData.startTime}
        onChange={handleChange('startTime')}
      />
      <TextInput
        title="End Time"
        value={formData.endTime}
        onChange={handleChange('endTime')}
      />
      <TextInput
        title="Hour Code"
        value={formData.hourCode}
        onChange={handleChange('hourCode')}
      />
      <NumberField
        title="Day of Week"
        value={formData.dayOfWeek}
        onChange={handleChange('dayOfWeek')}
      />
      <NumberField
        title="End Day of Week"
        value={formData.endDayOfWeek}
        onChange={handleChange('endDayOfWeek')}
      />
      <Spacings.Inline scale="m">
        <Spacings.Stack scale="s">
          <FieldLabel title="Hide Restaurant Hours"></FieldLabel>
          <Checkbox
            isChecked={formData.hideRestHours}
            onChange={handleCheckboxChange('hideRestHours')}
          />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
          <FieldLabel title="Special Hours"></FieldLabel>
          <Checkbox
            isChecked={formData.hasSpclHours}
            onChange={handleCheckboxChange('hasSpclHours')}
          />
        </Spacings.Stack>
        <Spacings.Stack scale="s">
          <FieldLabel title="Special Hours Message"></FieldLabel>
          <Checkbox
            isChecked={formData.hasSpclHoursMsg}
            onChange={handleCheckboxChange('hasSpclHoursMsg')}
          />
        </Spacings.Stack>
      </Spacings.Inline>

      <Spacings.Inline scale="s">
        <PrimaryButton
          onClick={handleSave}
          label="Save"
          iconRight={isSaving ? <LoadingSpinner /> : undefined}
          isDisabled={isSaving}
        />
        <SecondaryButton
          onClick={onCancel}
          label="Cancel"
          isDisabled={isSaving}
        />
      </Spacings.Inline>
    </Spacings.Stack>
  );
};

ItemEditor.displayName = 'ItemEditor';

export default ItemEditor;
