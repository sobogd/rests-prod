import { FC, useEffect, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import { ELoginTabs } from "./enums";
import { loginActions } from "./slice";
import { RememberLogin } from "./RememberLogin";
import { useAppDispatch, useAppSelector } from "../../app/store";

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((s) => s.login.tab);
  const userCreds = useAppSelector((s) => s.common.userCreds);

  const renderedTab = useMemo(() => {
    switch (tab) {
      case ELoginTabs.LOGIN:
        return <LoginForm />;
      case ELoginTabs.REGISTRATION:
        return <RegistrationForm />;
      case ELoginTabs.REMEMBER:
        return <RememberLogin />;
    }
  }, [tab]);

  useEffect(() => {
    if (userCreds) {
      dispatch(loginActions.setTab(ELoginTabs.REMEMBER));
    }
  }, [userCreds]);

  return (
    <Stack
      spacing={2}
      direction={{ xs: "column-reverse", md: "row" }}
      width="100%"
      height="100%"
      position="relative"
    >
      <Stack
        spacing={{ xs: 0, md: 2 }}
        justifyContent={{ xs: "flex-start", md: "space-between" }}
        flexGrow={1}
        sx={{ maxHeight: "100vh", overflowX: "hidden", overflowY: "scroll" }}
        paddingTop={{ xs: 2, md: 0 }}
      >
        <Stack
          direction="row"
          spacing={1}
          padding={2}
          alignItems="center"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <StorefrontIcon />
          <Typography fontWeight={500}>rests.app</Typography>
        </Stack>
        {renderedTab}
        <Stack
          direction="row"
          spacing={1}
          paddingY={{ xs: 1, md: 2 }}
          paddingX={{ xs: 4, md: 2 }}
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-start" }}
          paddingBottom={{ xs: 4, md: 2 }}
        >
          <MailOutlineIcon />
          <Typography> sobogd@gmail.com</Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          width: { xs: "100%", md: "calc(50% + 40px)" },
          height: { xs: "30vh", md: "calc(100% - 32px)" },
          background: "#f1eef8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "flex-end", md: "center" },
          borderRadius: { xs: 0, md: 8 },
          margin: { xs: "0 !important", md: "16px 16px 16px 0 !important" },
          img: {
            maxWidth: "70%",
            maxHeight: { xs: "140%", md: "70%" },
            marginRight: { xs: "-20px", md: "inherit" },
          },
        }}
      >
        <img src={`/login.png`} alt={"Login rests app"} />
      </Box>
    </Stack>
  );
};
