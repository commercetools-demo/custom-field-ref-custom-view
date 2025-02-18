/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'Custom Field Editor',
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: '${env:INITIAL_PROJECT_KEY}',
      hostUriPath: '${env:HOST_URI_PATH}',
    },
    production: {
      customViewId: '${env:CUSTOM_VIEW_ID}',
      url: '${env:APPLICATION_URL}',
    },
  },
  oAuthScopes: {
    view: ['view_products', 'view_key_value_documents', 'view_business_units'],
    manage: ['manage_products', 'manage_key_value_documents', 'manage_business_units'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'SMALL',
  },
  locators: ['customers.business_unit_details.general'],
};

export default config;
