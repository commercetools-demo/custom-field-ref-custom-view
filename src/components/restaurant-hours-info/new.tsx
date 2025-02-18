import Spacings from '@commercetools-uikit/spacings';
import { useCustomObject } from '../../hooks/use-custom-object';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  NOTIFICATION_KINDS_SIDE,
  DOMAINS,
} from '@commercetools-frontend/constants';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { useBusinessUnit } from '../../hooks/use-business-unit';

type NewRestaurantHoursInfoProps = {
  restaurantHoursInfo: Array<{
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
  }>;
  businessUnitKey: string;
  businessUnitId: string;
  onAddNew: () => void;
};

const NewRestaurantHoursInfo = (props: NewRestaurantHoursInfoProps) => {
  const { updateOrCreateCustomObject } = useCustomObject();
  const { addHoursInfoToBusinessUnit } = useBusinessUnit();
  const showNotification = useShowNotification();

  const handleAddNew = async () => {
    const newKey = `${props.businessUnitKey}-${
      props.restaurantHoursInfo.length + 1
    }`;
    const container = 'hoursInfo';

    const newHours = {
      name: 'New Hours',
      startTime: '09:00',
      endTime: '17:00',
      hasSpclHours: false,
      hasSpclHoursMsg: false,
      dayOfWeek: 0,
      endDayOfWeek: 0,
      hideRestHours: false,
      hourCode: '',
    };

    try {
      const result = await updateOrCreateCustomObject(
        container,
        newKey,
        newHours
      );
      await addHoursInfoToBusinessUnit(props.businessUnitId, {
        id: result.id,
        typeId: 'key-value-document',
      });
      showNotification({
        kind: NOTIFICATION_KINDS_SIDE.success,
        domain: DOMAINS.SIDE,
        text: 'New hours added successfully',
      });
      props.onAddNew();
    } catch (error) {
      showNotification({
        kind: NOTIFICATION_KINDS_SIDE.error,
        domain: DOMAINS.SIDE,
        text: 'Failed to add new hours',
      });
    }
  };

  return (
    <Spacings.Inline scale="m">
      <PrimaryButton
        onClick={handleAddNew}
        label="Add New Hours"
        iconRight={<PlusBoldIcon />}
      />
    </Spacings.Inline>
  );
};

NewRestaurantHoursInfo.displayName = 'NewRestaurantHoursInfo';

export default NewRestaurantHoursInfo;
