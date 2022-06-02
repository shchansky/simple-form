import React from "react";

export const SimpleForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailDirty, setEmailDirty] = React.useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>(
    "Email не может быть пустым"
  );
  const [passwordError, setPasswordError] = React.useState<string>(
    "Pasword не может быть пустым"
  );
  const [formValid, setFormValid] = React.useState<boolean>(false);

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
    []
  );

  const emailHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);

      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!re.test(String(e.target.value).toLowerCase())) {
        setEmailError("Не корректный email");
      } else {
        setEmailError("");
      }
    },
    []
  );

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
    []
  );

  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  return (
    <div style={{ border: "1px solid black" }}>
      <form>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <input
          name="email"
          value={email}
          type="text"
          placeholder="Enter you e-mail"
          style={{ display: "block" }}
          onBlur={blurHanndler}
          onChange={emailHandler}
        />
        {passwordDirty && passwordError && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <input
          name="password"
          value={password}
          type="password"
          placeholder="Enter you password"
          style={{ display: "block" }}
          onBlur={blurHanndler}
          onChange={passwordHandler}
        />
        <button type="submit" style={{ display: "block" }} disabled={!formValid}>
          Registration
        </button>
      </form>
    </div>
  );
};
