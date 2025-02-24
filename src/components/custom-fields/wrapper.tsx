import { useCallback, useEffect, useState } from 'react';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import { useBusinessUnit } from '../../hooks/use-business-unit';
import RestaurantHoursInfo from '../restaurant-hours-info';
import Amenities from '../amenities';
import Spacings from '@commercetools-uikit/spacings';
import NewRestaurantHoursInfo from '../restaurant-hours-info/new';
import { useEntity } from '../../hooks/use-entity';

type Props = {
  entity: string;
  id: string;
};

const CustomFieldsWarpper = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [entityObject, setEntityObject] = useState<any>(null);

  const { getExpandedEntityById } = useEntity();
  const fetch = useCallback(async () => {
    setIsLoading(true);
    await getExpandedEntityById(props.entity, props.id)
      .then(setEntityObject)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [getExpandedEntityById, props.entity, props.id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading) {
    return (
      <ContentNotification type="info">
        <Text.Body>Loading...</Text.Body>
      </ContentNotification>
    );
  }

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{error.message}</Text.Body>
      </ContentNotification>
    );
  }

  if (!entityObject) {
    return (
      <ContentNotification type="error">
        <Text.Body>Entity not found</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="m">
      Bilah
      {/* <Text.Headline as="h2">{businessUnit.name}</Text.Headline>
      <RestaurantHoursInfo
        restaurantHoursInfo={businessUnit.custom.fields.restaurantHoursInfo}
        businessUnitId={props.businessUnitId}
        onUpdate={fetch}
      />
      <NewRestaurantHoursInfo
        onAddNew={fetch}
        restaurantHoursInfo={businessUnit.custom.fields.restaurantHoursInfo}
        businessUnitKey={businessUnit.key}
        businessUnitId={props.businessUnitId}
      />
      <Amenities amenities={businessUnit.custom.fields.amenities} /> */}
    </Spacings.Stack>
  );
};

CustomFieldsWarpper.displayName = 'CustomFieldsWarpper';

export default CustomFieldsWarpper;
