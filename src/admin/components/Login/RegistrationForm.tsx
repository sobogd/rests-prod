import { FC } from "react";
import { LoginTabs } from ".";
import { Form, Formik } from "formik";
import { TbAddressBook, TbLogin2 } from "react-icons/tb";
import styled from "@emotion/styled";
import FormikInput from "../FormikInput";
import FormikSelect from "../Select/FormikSelect";
import { currencies, languages } from "../../utils/timezones";
import { useRegisterMutation } from "../Auth/api";
import Loading from "../loading";
import { backgroundDefault, textDefaultColor } from "../../styles";

const FormStyled = styled(Form)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: ${backgroundDefault};
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 40px 0;
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

interface IRegistrationForm {
  email?: string;
  title?: string;
  registerL?: string;
  tin?: string;
  registerP?: string;
  passwordRepeat?: string;
  currency?: string;
  lang?: string;
}

export const RegistrationForm: FC<{ setTab: (tab: LoginTabs) => void }> = ({ setTab }) => {
  const [register, { data, isLoading }] = useRegisterMutation();

  return (
    <Formik
      initialValues={{ lang: "en", currency: "$", registerL: "" }}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values: IRegistrationForm) =>
        !data?.login
          ? register({
              email: values.email ?? "",
              title: values.title ?? "",
              tin: values.tin ?? "",
              login: values.registerL ?? "",
              password: values.registerP ?? "",
              lang: values.lang ?? "",
              currency: values.currency ?? "",
            })
          : setTab("login")
      }
      validate={(values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.title) errors.title = "Title is required";
        if (!values.tin) {
          errors.tin = "Tin is required";
        } else if (!/^[0-9]+$/i.test(values.tin)) {
          errors.tin = "Tin must have only numbers";
        } else if (values.tin.length < 10 || values.tin.length > 12) {
          errors.tin = "Tin must have 10-12 numbers";
        }
        if (!values.registerL) {
          errors.registerL = "Login is required";
        } else if (!/^[a-zA-Z0-9]+$/i.test(values.registerL)) {
          errors.registerL = "Login must have only letters or numbers";
        }
        if (!values.registerP) {
          errors.registerP = "Password is required";
        } else if (values.registerP.length < 4) {
          errors.registerP = "Password must have more than 4 sybmols";
        }
        if (!values.passwordRepeat) errors.passwordRepeat = "Repeat the password";
        if (values.registerP?.toString() !== values.passwordRepeat?.toString())
          errors.passwordRepeat = "Passwords not same";
        if (!values.lang) errors.lang = "Language is required";
        if (!values.currency) errors.currency = "Currency is required";
        return errors;
      }}
    >
      {() => (
        <>
          <Loading isLoading={isLoading} />
          <FormStyled autoComplete="off">
            <div>
              <img src="/login.png" />
            </div>
            {!data?.login ? (
              <>
                <div>
                  <h1>Welcome to workplace</h1>
                  <p>Company registration:</p>
                </div>
                <FormikInput label={"Title"} name="title" mb />
                <FormikInput label={"Login"} name="registerL" mb />
                <FormikInput label={"Email"} name="email" mb />
                <FormikInput label={"TIN"} name="tin" mb />
                <FormikInput label={"Password"} name="registerP" mb type="password" />
                <FormikInput label={"Password repeat"} name="passwordRepeat" mb type="password" />
                <FormikSelect
                  label={"Language"}
                  name="lang"
                  mb
                  options={languages.map((c) => ({ value: c.code, label: c.name }))}
                  firstDefault
                />
                <FormikSelect
                  label={"Currency symbol"}
                  name="currency"
                  mb
                  options={currencies.map((c) => ({ value: c.symbol, label: c.name }))}
                  firstDefault
                />
                <div>
                  <button type="submit">
                    <TbAddressBook />
                    Register
                  </button>
                  <span onClick={() => setTab("login")}>Back to login</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1>Welcome to workplace</h1>
                  <p>Your login: {data?.login}-admin</p>
                </div>
                <div>
                  <button type="submit">
                    <TbLogin2 />
                    Back to login
                  </button>
                </div>
              </>
            )}
          </FormStyled>
        </>
      )}
    </Formik>
  );
};
