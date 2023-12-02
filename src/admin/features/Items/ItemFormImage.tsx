import { ChangeEvent, FC } from "react";
import { Notice } from "../../hooks/useNotification";
import { useTranslation } from "react-i18next";
import { errorColor, prePrimaryColor } from "../../app/styles";
import { useFormikContext } from "formik";
import styled from "@emotion/styled";
import { TbCloudUpload, TbTrash } from "react-icons/tb";

const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${prePrimaryColor};
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

const ImageContainer = styled.div`
  position: relative;
  span {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: ${errorColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const ItemFormImage: FC = () => {
  const { values, setValues } = useFormikContext<any>();
  const i18n = useTranslation();

  const fileUrl = values.fUrl;

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      const tempImg = new Image();
      tempImg.onload = function () {
        // @ts-ignore
        if (this.width < this.height) {
          Notice.warning("Width must be greater than height");
        } else if (e.target.files?.[0]) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(e.target.files?.[0]);
          fileReader.onload = function (evt) {
            const base64 = evt.target?.result;
            setValues({ ...values, f: base64, fUrl: url, fChanged: true });
            e.currentTarget.files = null;
            return base64;
          };
        }
      };
      tempImg.src = url;
    }
  };

  const handleRemovePhoto = () => {
    setValues({ ...values, f: undefined, fUrl: undefined, fChanged: true });
  };

  return fileUrl != null ? (
    <ImageContainer>
      <Img src={fileUrl} />
      <span onClick={handleRemovePhoto}>
        <TbTrash />
      </span>
    </ImageContainer>
  ) : (
    <FileUploadButton htmlFor="fileUpload">
      <input name="fileUpload" id="fileUpload" type="file" hidden onChange={handleChangeFile} />
      <TbCloudUpload /> {!!fileUrl ? i18n.t("items.form.image.change") : i18n.t("items.form.image.upload")}
    </FileUploadButton>
  );
};
