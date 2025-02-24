import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import {
  useAsyncDispatch,
  actions,
  TSdkAction,
} from '@commercetools-frontend/sdk';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { buildUrlWithParams } from '../utils';
import { useCallback } from 'react';
import {
  FieldDefinition,
  FieldType,
} from '@commercetools/platform-sdk';

const isFieldTypeAReference = (fieldType: FieldType) => {
  if (fieldType.name === 'Set') {
    return isFieldTypeAReference(fieldType.elementType);
  }
  return fieldType.name === 'Reference';
};

export const useEntity = () => {
  const dispatchEntityRead = useAsyncDispatch<TSdkAction, any>();
  const context = useApplicationContext((context) => context);

  const getCustomTypeDefinitionById = useCallback(
    async (id?: string): Promise<any> => {
      const result = await dispatchEntityRead(
        actions.get({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: buildUrlWithParams(`/${context?.project?.key}/types/${id}`, {}),
        })
      );
      return result;
    },
    [dispatchEntityRead, context?.project?.key]
  );

  const getEntityById = useCallback(
    async (entity: string, id?: string, expand?: string[]): Promise<any> => {
      const result = await dispatchEntityRead(
        actions.get({
          mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
          uri: buildUrlWithParams(`/${context?.project?.key}/${entity}/${id}`, {
            ...(expand ? { expand } : {}),
          }),
        })
      );
      return result;
    },
    [dispatchEntityRead, context?.project?.key]
  );

  const getExpandedEntityById = useCallback(
    async (entity: string, id?: string): Promise<any> => {
      const result = await getEntityById(entity, id);
      if (
        result.custom?.type &&
        result.custom?.type.id &&
        result.custom?.fields
      ) {
        const customTypeDefinition = await getCustomTypeDefinitionById(
          result.custom.type.id
        );
        const expansionFields = customTypeDefinition.fieldDefinitions
          .filter((filedDef: FieldDefinition) =>
            isFieldTypeAReference(filedDef.type)
          )
          .map((fieldDefinition: FieldDefinition) => {
            return `custom.fields.${
              fieldDefinition.type.name === 'Set'
                ? `${fieldDefinition.name}[*]`
                : fieldDefinition.name
            }`;
          });
        return getEntityById(entity, id, expansionFields);
      }
      return result;
    },
    [dispatchEntityRead, context?.project?.key]
  );

  return {
    getExpandedEntityById,
  };
};
