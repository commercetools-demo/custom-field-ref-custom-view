import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import CustomFieldsWarpper from './wrapper';

function extractEntityAndId(url: string) {
  // Split the URL into parts
  const parts = url.split('/');

  // Find the UUID in the URL
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

  // Find the index of the part containing the UUID
  const uuidIndex = parts.findIndex((part) => uuidRegex.test(part));

  if (uuidIndex !== -1) {
    // The entity is everything before the UUID (joined if multiple parts)
    let entity;
    if (uuidIndex > 1) {
      // Handle nested entities (like "customers/business-units")
      entity = parts[uuidIndex - 1];
    } else {
      entity = parts[0];
    }

    return {
      entity: entity,
      id: parts[uuidIndex],
    };
  }

  return null;
}

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

  const entityAndId = extractEntityAndId(hostUrl);

  if (!entityAndId || !entityAndId.id || !entityAndId.entity) {
    return (
      <ContentNotification type="error">
        <Text.Body>No Main Entity found</Text.Body>
      </ContentNotification>
    );
  }
  return (
    <CustomFieldsWarpper entity={entityAndId.entity} id={entityAndId.id} />
  );
};

CustomFields.displayName = 'CustomFields';

export default CustomFields;
