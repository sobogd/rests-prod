import { FC } from "react";
import { Title, Typography } from "../../styles";
import { useTranslation } from "react-i18next";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBrandGoogleMaps } from "react-icons/tb";
import { FaRegMap } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCompanyQuery } from "../../api";

export const Contacts: FC = () => {
  const { i18n } = useTranslation();
  const login = useParams()?.login ?? "";
  const { data } = useCompanyQuery(login);

  return (
    <>
      <Title>{i18n.t("contactsTitle")}</Title>
      <Typography withIcon>
        <span>
          <BsTelephone />
        </span>
        <span>{i18n.t("phoneWhatsApp")}:</span>
        <a href={`tel:${data?.phone}`}>{data?.phone}</a>
      </Typography>
      <Typography withIcon>
        <span>
          <IoLogoInstagram />
        </span>
        <span>Instagram:</span>
        <span>
          @{" "}
          <a target="__blank" href={`https://www.instagram.com/${data?.instagram}/`}>
            {data?.instagram}
          </a>
        </span>
      </Typography>
      <Typography withIcon>
        <span>
          <MdOutlineAlternateEmail />
        </span>
        <span>Email:</span>
        <a href={`mailto:${data?.email}`}>{data?.email}</a>
      </Typography>
      <Typography withIcon>
        <span>
          <TbBrandGoogleMaps />
        </span>
        <span>Google Maps:</span>
        <a target="__blank" href={data?.google_maps_link}>
          {i18n.t("openLocation")}
        </a>
      </Typography>
      <Typography withIcon>
        <span>
          <FaRegMap />
        </span>
        <span>{i18n.t("address")}:</span>
        <span>{data?.address}</span>
      </Typography>
    </>
  );
};
