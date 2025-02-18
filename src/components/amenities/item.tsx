import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { useState } from 'react';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import ItemEditor from './item-editor';
import { useCustomObject } from '../../hooks/use-custom-object';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import Card from '@commercetools-uikit/card';
import { EditIcon } from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
type AmenityItemProps = {
  amenity: {
    id: string;
    obj?: {
      key: string;
      container: string;
      value?: {
        title?: string;
        description?: string;
        imgURL?: string;
        altText?: string;
      };
    };
  };
};

const AmenityItem = (props: AmenityItemProps) => {
  const { amenity } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [amenityData, setAmenityData] = useState(amenity);
  const { updateOrCreateCustomObject } = useCustomObject();
  const showNotification = useShowNotification();

  const handleSave = async (updatedAmenity: AmenityItemProps['amenity']) => {
    if (
      amenityData.obj?.container &&
      amenityData.obj?.key &&
      updatedAmenity.obj?.value
    ) {
      const result = await updateOrCreateCustomObject(
        amenityData.obj?.container,
        amenityData.obj?.key,
        updatedAmenity.obj?.value
      );
      setAmenityData((prev) => ({
        ...prev,
        obj: result,
      }));
      showNotification({
        kind: NOTIFICATION_KINDS_SIDE.success,
        domain: DOMAINS.SIDE,
        text: 'Amenity updated successfully',
      });
    }
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card>
        <ItemEditor
          amenity={amenityData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Card>
    );
  }

  return (
    <Spacings.Inline justifyContent="space-between">
      <Spacings.Stack scale="s">
        <Text.Body>{amenityData.obj?.value?.title}</Text.Body>
        {amenityData.obj?.value?.description && (
          <Text.Detail>{amenityData.obj?.value?.description}</Text.Detail>
        )}
        {amenityData.obj?.value?.imgURL && (
          <img
            src={amenityData.obj?.value?.imgURL}
            alt={amenityData.obj?.value?.altText || ''}
          />
        )}
        {amenityData.obj?.value?.altText && (
          <Text.Detail>{amenityData.obj?.value?.altText}</Text.Detail>
        )}
      </Spacings.Stack>
      <IconButton
        icon={<EditIcon />}
        onClick={() => setIsEditing(true)}
        label="Edit"
      />
    </Spacings.Inline>
  );
};

AmenityItem.displayName = 'AmenityItem';

export default AmenityItem;
