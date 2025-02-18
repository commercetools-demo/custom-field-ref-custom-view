import { useState } from 'react';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import TextInput from '@commercetools-uikit/text-field';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

type ItemEditorProps = {
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
  onSave?: (amenity: ItemEditorProps['amenity']) => Promise<void>;
  onCancel?: () => void;
};

const ItemEditor = (props: ItemEditorProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { amenity, onSave, onCancel } = props;
  const [formData, setFormData] = useState({
    title: amenity.obj?.value?.title || '',
    description: amenity.obj?.value?.description || '',
    imgURL: amenity.obj?.value?.imgURL || '',
    altText: amenity.obj?.value?.altText || '',
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      await onSave({
        ...amenity,
        obj: {
          ...amenity.obj,
          value: formData,
        },
      });
      setIsSaving(false);
    }
  };

  return (
    <Spacings.Stack scale="m">
      <TextInput
        title="Title"
        value={formData.title}
        onChange={handleChange('title')}
      />
      <TextInput
        title="Description"
        value={formData.description}
        onChange={handleChange('description')}
      />
      <TextInput
        title="Image URL"
        value={formData.imgURL}
        onChange={handleChange('imgURL')}
      />
      <TextInput
        title="Alt Text"
        value={formData.altText}
        onChange={handleChange('altText')}
      />
      <Spacings.Inline scale="s">
        <PrimaryButton
          onClick={handleSave}
          label="Save"
          iconRight={isSaving ? <LoadingSpinner /> : undefined}
          isDisabled={isSaving}
        />
        <SecondaryButton
          onClick={onCancel}
          label="Cancel"
          isDisabled={isSaving}
        />
      </Spacings.Inline>
    </Spacings.Stack>
  );
};

ItemEditor.displayName = 'ItemEditor';

export default ItemEditor;
