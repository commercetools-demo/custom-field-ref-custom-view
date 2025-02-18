import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { useState } from 'react';
import ItemEditor from './item-editor';
import { BinFilledIcon, EditIcon } from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
import Card from '@commercetools-uikit/card';
import { useCustomObject } from '../../hooks/use-custom-object';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import { NOTIFICATION_KINDS_SIDE } from '@commercetools-frontend/constants';
import { DOMAINS } from '@commercetools-frontend/constants';
import { useBusinessUnit } from '../../hooks/use-business-unit';

type RestaurantHoursItemProps = {
  businessUnitId: string;
  onUpdate: () => void;
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
};

const RestaurantHoursItem = (props: RestaurantHoursItemProps) => {
  const { hours, businessUnitId } = props;
  const [hoursData, setHoursData] = useState(hours);
  const [isEditing, setIsEditing] = useState(false);
  const { updateOrCreateCustomObject, deleteCustomObject } = useCustomObject();
  const { removeHoursInfoFromBusinessUnit } = useBusinessUnit();
  const showNotification = useShowNotification();

  const handleSave = async (
    updatedHours: RestaurantHoursItemProps['hours']
  ) => {
    if (hoursData.obj?.container && hoursData.obj?.key) {
      const result = await updateOrCreateCustomObject(
        hoursData.obj?.container,
        hoursData.obj?.key,
        updatedHours.obj?.value
      );
      console.log('result', result);
      setHoursData((prev) => ({
        ...prev,
        obj: result,
      }));
      showNotification({
        kind: NOTIFICATION_KINDS_SIDE.success,
        domain: DOMAINS.SIDE,
        text: 'Hours updated successfully',
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (hoursData.obj?.container && hoursData.obj?.key && businessUnitId) {
      const result = await deleteCustomObject(
        hoursData.obj?.container,
        hoursData.obj?.key
      );
      await removeHoursInfoFromBusinessUnit(businessUnitId, hoursData.id);
      props.onUpdate();
    }
  };

  if (isEditing) {
    return (
      <Card>
        <ItemEditor
          hours={hoursData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Card>
    );
  }

  return (
    <Spacings.Inline justifyContent="space-between">
      <Spacings.Stack scale="s">
        <Text.Body>
          {hoursData.obj?.value?.name}: {hoursData.obj?.value?.startTime} -{' '}
          {hoursData.obj?.value?.endTime}
        </Text.Body>
        {hoursData.obj?.value?.hasSpclHours && (
          <Text.Body>
            {hoursData.obj?.value?.hasSpclHoursMsg
              ? 'Special Hours'
              : 'Regular Hours'}
          </Text.Body>
        )}
        {hoursData.obj?.value?.hideRestHours && (
          <Text.Body>Hide Restaurant Hours</Text.Body>
        )}
        {hoursData.obj?.value?.hourCode && (
          <Text.Body>Hour Code: {hoursData.obj?.value?.hourCode}</Text.Body>
        )}
        {hoursData.obj?.value?.dayOfWeek && (
          <Text.Body>Day of Week: {hoursData.obj?.value?.dayOfWeek}</Text.Body>
        )}
        {hoursData.obj?.value?.endDayOfWeek && (
          <Text.Body>
            End Day of Week: {hoursData.obj?.value?.endDayOfWeek}
          </Text.Body>
        )}
      </Spacings.Stack>
      <Spacings.Inline scale="s">
        <IconButton
          icon={<EditIcon />}
          onClick={() => setIsEditing(true)}
          label="Edit"
        />
        <IconButton
          icon={<BinFilledIcon />}
          onClick={() => handleDelete()}
          label="Delete"
        />
      </Spacings.Inline>
    </Spacings.Inline>
  );
};

RestaurantHoursItem.displayName = 'RestaurantHoursItem';

export default RestaurantHoursItem;
