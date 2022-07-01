import React from "react";
import * as hooks from "./simple-form.hooks";
import * as Markup from "./simple-form.styles";

export const SimpleForm = () => {
  const { email, emailError, emailHandler } = hooks.useEmailData();
  const { password, passwordError, passwordHandler } = hooks.usePasswordData();
  const { formValid, emailDirty, passwordDirty, blurHanndler } = hooks.useFormValid(emailError, passwordError);

  return (
    <Markup.Container>
      <Markup.Header>Simple Form</Markup.Header>
      <Markup.Form autoComplete="off">
        <Markup.Error style={{ color: "red" }}>{emailDirty && emailError}</Markup.Error>
        <Markup.Input
          name="email"
          value={email}
          type="text"
          placeholder="Enter you e-mail"
          onBlur={blurHanndler}
          onChange={emailHandler}
        />
        <Markup.Error style={{ color: "red" }}>{passwordDirty && passwordError}</Markup.Error>
        <Markup.Input
          name="password"
          value={password}
          type="password"
          placeholder="Enter you password"
          onBlur={blurHanndler}
          onChange={passwordHandler}
        />
        <Markup.Button type="submit" style={{ display: "block" }} disabled={!formValid}>
          Registration
        </Markup.Button>
      </Markup.Form>
    </Markup.Container>
  );
};
