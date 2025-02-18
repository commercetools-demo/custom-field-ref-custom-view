import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
  useAsyncDispatch,
  actions,
  TSdkAction,
} from '@commercetools-frontend/sdk';
import { BusinessUnit as CommercetoolsBusinessUnit } from '@commercetools/platform-sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { buildUrlWithParams } from '../utils';
import { useCallback } from 'react';

export const useBusinessUnit = () => {
  const dispatchProductRead = useAsyncDispatch<
    TSdkAction,
    CommercetoolsBusinessUnit
  >();
  const context = useApplicationContext((context) => context);

  const getBusinessUnitById = useCallback(
    async (id?: string): Promise<CommercetoolsBusinessUnit> => {
      const result = await dispatchProductRead(
        actions.get({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: buildUrlWithParams(
            `/${context?.project?.key}/business-units/${id}`,
            {
              expand: [
                'custom.fields.restaurantHoursInfo[*]',
                'custom.fields.amenities[*]',
              ],
            }
          ),
        })
      );
      return result;
    },
    [dispatchProductRead, context?.project?.key]
  );

  const addHoursInfoToBusinessUnit = useCallback(
    async (businessUnitId: string, hoursInfo: any) => {
      const businessUnit = await getBusinessUnitById(businessUnitId);
      await dispatchProductRead(
        actions.post({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: `/${context?.project?.key}/business-units/${businessUnitId}`,
          payload: {
            version: businessUnit.version,
            actions: [
              {
                action: 'setCustomField',
                name: 'restaurantHoursInfo',
                value: [
                  ...businessUnit.custom?.fields.restaurantHoursInfo,
                  hoursInfo,
                ],
              },
            ],
          },
        })
      );
    },
    [dispatchProductRead, context?.project?.key]
  );

  const removeHoursInfoFromBusinessUnit = useCallback(
    async (businessUnitId: string, hoursInfoId: string) => {
      const businessUnit = await getBusinessUnitById(businessUnitId);
      await dispatchProductRead(
        actions.post({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: `/${context?.project?.key}/business-units/${businessUnitId}`,
          payload: {
            version: businessUnit.version,
            actions: [
              {
                action: 'setCustomField',
                name: 'restaurantHoursInfo',
                value: businessUnit.custom?.fields.restaurantHoursInfo.filter(
                  (hoursInfo: any) => hoursInfo.id !== hoursInfoId
                ),
              },
            ],
          },
        })
      );
    },
    [dispatchProductRead, context?.project?.key]
  );

  return {
    getBusinessUnitById,
    addHoursInfoToBusinessUnit,
    removeHoursInfoFromBusinessUnit,
  };
};
