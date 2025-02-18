import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
  useAsyncDispatch,
  actions,
  TSdkAction,
} from '@commercetools-frontend/sdk';
import { CustomObject as CommercetoolsCustomObject } from '@commercetools/platform-sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useCallback } from 'react';

export const useCustomObject = () => {
  const dispatchProductRead = useAsyncDispatch<
    TSdkAction,
    CommercetoolsCustomObject
  >();
  const context = useApplicationContext((context) => context);

  const updateOrCreateCustomObject = useCallback(
    async (
      container: string,
      key: string,
      value: any
    ): Promise<CommercetoolsCustomObject> => {
      const result = await dispatchProductRead(
        actions.post({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: `/${context?.project?.key}/custom-objects`,
          payload: {
            container,
            key,
            value,
          },
        })
      );
      return result;
    },
    [dispatchProductRead, context?.project?.key]
  );

  const deleteCustomObject = useCallback(
    async (container: string, key: string): Promise<CommercetoolsCustomObject> => {
      return dispatchProductRead(
        actions.del({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: `/${context?.project?.key}/custom-objects/${container}/${key}`,
        })
      );
    },
    [dispatchProductRead, context?.project?.key]
  );

  return { updateOrCreateCustomObject, deleteCustomObject };
};
