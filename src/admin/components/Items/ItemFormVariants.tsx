import styled from '@emotion/styled';
import { useFormikContext } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TbPlus, TbTrash } from 'react-icons/tb';
import shortid from 'shortid';

import { useAuth } from '../../providers/Auth';
import { textDefaultColor, newBorderColor, errorColor } from '../../styles';
import FormikInput from '../FormikInput';

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${textDefaultColor};
  color: white;
  height: 45px;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  svg {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
`;

const Variant = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;
  > div {
    :not(:first-child) {
      border-top: 0;
      border-radius: 0;
      input {
        border-radius: 0;
      }
      label {
        ::before {
          background-color: white;
        }
      }
    }
    :last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      input {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    :first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    display: flex;
    flex-direction: row;
    width: 100%;
    background: white;
    border-radius: 10px;
    border: 1px solid ${newBorderColor};
    input,
    select {
      border: 0;
    }
    > div {
      :nth-of-type(1) {
        width: 100%;
        input {
          border-radius: 0;
          border-top-left-radius: 10px;
          border-right: 1px solid #ede7ff;
        }
        margin-right: 1px;
      }
      :nth-of-type(2) {
        min-width: 100px;
        input {
          border-radius: 0;
          border-right: 1px solid #ede7ff;
        }
      }
    }
    span {
      margin: 0;
      display: flex;
      max-width: 50px;
      min-width: 50px;
      padding: 5px;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      max-height: 50px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 0px;
      svg {
        margin: 0;
        width: 50px;
        height: 50px;
        color: ${errorColor};
        padding: 0 10px;
      }
    }
  }
`;

export const ItemFormVariants: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const { t } = useTranslation();

  const langs = useAuth()?.whoami?.company?.langs ?? [];
  const lang = useAuth()?.whoami?.company?.lang ?? 'en';

  const handleAddVariant = () => {
    setValues({
      ...values,
      v: [...(values.v ?? []), { p: '', n: '', id: shortid.generate() }],
      vt: [...(values.vt ?? []), langs.map((lang) => ({ l: lang, t: '' }))],
    });
  };

  const handleRemoveVariant = (variant_index: number) => () => {
    setValues({
      ...values,
      v:
        values.v?.filter(
          (_: unknown, index: number) => index !== variant_index,
        ) ?? [],
      vt:
        values.vt?.filter(
          (_: unknown, index: number) => index !== variant_index,
        ) ?? [],
    });
  };

  return (
    <>
      {values.v?.map(
        (
          variant: { n?: string; p?: number; id?: string },
          variant_index: number,
        ) => (
          <Variant>
            <div style={variant_index === 0 ? { marginTop: 15 } : undefined}>
              <FormikInput
                name={`v.${variant_index}.n`}
                label={t('items.form.variants.name') + lang}
              />
              <span onClick={handleRemoveVariant(variant_index)}>
                <TbTrash />
              </span>
            </div>
            {values.vt?.[variant_index]?.map(
              (
                translation: { l: string; t: string },
                variant_translation_index: number,
              ) => {
                return (
                  <FormikInput
                    name={`vt.[${variant_index}].[${variant_translation_index}].t`}
                    label={t('items.form.variants.translation') + translation.l}
                  />
                );
              },
            )}
            <FormikInput
              name={`v.[${variant_index}].p`}
              type="number"
              label={t('items.form.variants.price')}
            />
          </Variant>
        ),
      )}
      <AddButton onClick={handleAddVariant}>
        <TbPlus />
        {t('items.form.variants.addVariant')}
      </AddButton>
    </>
  );
};
