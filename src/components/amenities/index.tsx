import { useEffect, useState } from 'react';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import AmenityItem from './item';
import ItemEditor from './item-editor';

type AmenitiesProps = {
  amenities: Array<{
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
  }>;
};

const Amenities = (props: AmenitiesProps) => {
  if (!props.amenities || props.amenities.length === 0) {
    return (
      <ContentNotification type="info">
        <Text.Body>No amenities information available</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="m">
      <Text.Headline as="h3">Amenities</Text.Headline>
      {props.amenities.map((amenity) => (
        <AmenityItem key={amenity.id} amenity={amenity} />
      ))}
    </Spacings.Stack>
  );
};

Amenities.displayName = 'Amenities';

export default Amenities;
