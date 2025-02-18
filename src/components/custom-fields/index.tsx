import { useEffect, useState } from 'react';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import CustomFieldsWarpper from './wrapper';
const CustomFields = () => {
  const { hostUrl } = useCustomViewContext((context) => ({
    hostUrl: context.hostUrl,
  }));

  if (!hostUrl) {
    return (
      <ContentNotification type="error">
        <Text.Body>No host url</Text.Body>
      </ContentNotification>
    );
  }
  console.log(hostUrl);

  const [__, businessUnitId] =
    hostUrl.match(/customers\/business-units\/([^/]+)\/general/) || [];

  if (!businessUnitId) {
    return (
      <ContentNotification type="error">
        <Text.Body>No Business Unit id</Text.Body>
      </ContentNotification>
    );
  }
  return <CustomFieldsWarpper businessUnitId={businessUnitId} />;
};

CustomFields.displayName = 'CustomFields';

export default CustomFields;
