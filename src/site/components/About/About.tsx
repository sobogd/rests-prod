import { FC } from "react";
import { Title, Typography } from "../../styles";
import { useTranslation } from "react-i18next";

export const About: FC = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <Title>{i18n.t("aboutTitle")}</Title>
      <Typography></Typography>
    </>
  );
};
