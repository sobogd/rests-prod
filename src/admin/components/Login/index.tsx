import { FC, useEffect, useMemo, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import { RememberLogin } from "./RememberLogin";

export type LoginTabs = "login" | "remember" | "register";

export const Login: FC = () => {
  const [tab, setTab] = useState<LoginTabs>("login");

  useEffect(() => {
    if (localStorage.getItem("loginHash") !== null) {
      setTab("remember");
    }
  }, []);

  const renderedTab = useMemo(() => {
    switch (tab) {
      case "login":
        return <LoginForm setTab={setTab} />;
      case "register":
        return <RegistrationForm setTab={setTab} />;
      case "remember":
        return <RememberLogin setTab={setTab} />;
    }
  }, [tab]);

  return renderedTab;
};
