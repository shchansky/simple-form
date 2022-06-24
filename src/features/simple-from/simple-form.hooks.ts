import React from "react";

export const useEmailData = () => {
  const [email, setEmail] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("Email не может быть пустым");

  const emailHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);

      const re =
        // eslint-disable-next-line
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        
      if (!re.test(String(e.target.value).toLowerCase())) {
        setEmailError("Не корректный email");
      } else {
        setEmailError("");
      }
    },
    [setEmail, setEmailError]
  );

  return { email, emailError, emailHandler };
};

export const usePasswordData = () => {
  const [password, setPassword] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("Pasword не может быть пустым");

  const passwordHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (e.target.value.length < 3 || e.target.value.length > 20) {
        setPasswordError("Пароль д.б. больше 3-х и меньше 20 символов");

        if (!e.target.value) {
          setPasswordError("Pasword не может быть пустым");
        }
      } else {
        setPasswordError("");
      }
    },
    [setPasswordError, setPassword]
  );

  return {
    password,
    passwordError,
    passwordHandler,
  };
};

export const useFormValid = (emailError: string, passwordError: string) => {
  const [emailDirty, setEmailDirty] = React.useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);
  const [formValid, setFormValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, setFormValid]);

  const blurHanndler = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement>) => {
      switch (ev.target.name) {
        case "email":
          setEmailDirty(true);
          break;
        case "password":
          setPasswordDirty(true);
          break;
      }
    },
    [setEmailDirty, setPasswordDirty]
  );
  return { formValid, emailDirty, passwordDirty, blurHanndler };
};
