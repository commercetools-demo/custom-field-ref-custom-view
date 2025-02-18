import { useEffect, useState } from 'react';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import RestaurantHoursItem from './item';
type RestaurantHoursInfoProps = {
  businessUnitId: string;
  onUpdate: () => void;
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
};

const RestaurantHoursInfo = (props: RestaurantHoursInfoProps) => {
  if (!props.restaurantHoursInfo || props.restaurantHoursInfo.length === 0) {
    return (
      <ContentNotification type="info">
        <Text.Body>No restaurant hours information available</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="m">
      <Text.Headline as="h3">Restaurant Hours</Text.Headline>
      {props.restaurantHoursInfo.map((hours) => (
        <RestaurantHoursItem
          onUpdate={props.onUpdate}
          key={hours.id}
          hours={hours}
          businessUnitId={props.businessUnitId}
        />
      ))}
    </Spacings.Stack>
  );
};

RestaurantHoursInfo.displayName = 'RestaurantHoursInfo';

export default RestaurantHoursInfo;
