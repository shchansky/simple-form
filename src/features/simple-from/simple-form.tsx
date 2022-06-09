import React from "react";
import * as hooks from "./simple-form.hooks";
import * as Markup from "./simple-form.styles";

export const SimpleForm = () => {
  const { email, emailError, emailHandler } = hooks.useEmailData();
  const { password, passwordError, passwordHandler } = hooks.usePasswordData();
  const { formValid, emailDirty, passwordDirty, blurHanndler } =
    hooks.useFormValid(emailError, passwordError);

  return (
    <div style={{ border: "1px solid black" }}>
      <Markup.From>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <Markup.Input
          name="email"
          value={email}
          type="text"
          placeholder="Enter you e-mail"
          onBlur={blurHanndler}
          onChange={emailHandler}
        />
        {passwordDirty && passwordError && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <Markup.Input
          name="password"
          value={password}
          type="password"
          placeholder="Enter you password"
          onBlur={blurHanndler}
          onChange={passwordHandler}
        />
        <button
          type="submit"
          style={{ display: "block" }}
          disabled={!formValid}
        >
          Registration
        </button>
      </Markup.From>
    </div>
  );
};
