import { DynamicContentKeysEnum } from '../../enums/dynamic-content-keys.enum';

export default function replaceDynamicContentWithData(
  content: string,
  dynamicData: object,
): string {
  return content.replace(
    DynamicContentKeysEnum.responseSchemaJsonConfig,
    JSON.stringify(dynamicData, null, 2),
  );
}
