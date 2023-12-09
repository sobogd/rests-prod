import { FC } from "react";
import { Form, Formik } from "formik";
import styled from "@emotion/styled";
import FormikInput from "../FormikInput";
import { useAuth } from "../Auth/Context";
import { TbLogin2 } from "react-icons/tb";
import { LoginTabs } from ".";
import { backgroundDefault, textDefaultColor } from "../../styles";

const FormStyled = styled(Form)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${backgroundDefault};
  padding: 0 15px;
  > div {
    width: 320px;
    max-width: 100%;
    margin: 0 auto 25px;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    text-align: left;
    img {
      max-height: calc(100vh - 550px);
      margin: 0 auto;
    }
    :nth-child(2) {
      flex-direction: column;
      text-align: center;

      h1 {
        font-size: 20px;
      }
      p {
        font-size: 16px;
        color: gray;
      }
    }
    :last-child {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0;
      button {
        color: white;
        background-color: ${textDefaultColor};
        outline: none;
        border-radius: 10px;
        min-height: 50px;
        font-size: 16px;
        width: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 15px;
        svg {
          margin-right: 7px;
          width: 20px;
          height: 20px;
          min-width: 20px;
        }
      }
      span {
        margin-top: 15px;
        font-size: 14px;
        color: gray;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

interface ILoginForm {
  login?: string;
  password?: string;
}

export const LoginForm: FC<{ setTab: (tab: LoginTabs) => void }> = ({ setTab }) => {
  const auth = useAuth();

  return (
    <Formik
      initialValues={{ login: "", password: "" }}
      onSubmit={(values: ILoginForm) => {
        auth.login({ login: values.login ?? "", password: values.password ?? "" });
      }}
    >
      {() => (
        <FormStyled autoComplete="off">
          <div>
            <img src="/login.png" />
          </div>
          <div>
            <h1>Welcome to workplace</h1>
            <p>Enter your credentials:</p>
          </div>
          <FormikInput label={"Login"} name="login" mb />
          <FormikInput label={"Password"} name="password" mb type="password" />
          <div>
            <button type="submit">
              <TbLogin2 />
              Login
            </button>
            <span onClick={() => setTab("register")}>Registration</span>
          </div>
        </FormStyled>
      )}
    </Formik>
  );
};
