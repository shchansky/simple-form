import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as Markup from "./formic-yup.styles";

export const FormicYup = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательно"),
    surname: yup.string().required("Обязательно"),
    password: yup.string().required("Обязательно"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Обязательно к заполнению"),
    email: yup.string().email("Введите верный e-mail").required("Поле Email обязательно к заполнению"),
    confirmEmail: yup
      .string()
      .email("Введите верный e-mail")
      .oneOf([yup.ref("email")], "email не совпадают")
      .required("Поле подтвердите Email обязательно к заполнению"),
  });

  return (
    <Markup.Container>
      <Markup.Header>Formik-yup</Markup.Header>
      <Formik
        initialValues={{ name: "", surname: "", password: "", confirmPassword: "", email: "", confirmEmail: "" }}
        validateOnBlur
        onSubmit={async (values, { resetForm }) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          resetForm();
        }}
        validationSchema={validationSchema}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, dirty, handleSubmit }) => (
          <Markup.Form className="form" autoComplete="off">
            <Markup.Inner>
              <Markup.Error>{touched.name && errors.name && "Поле имя обязательно к заполнению"}</Markup.Error>
              <Markup.Input
                type="text"
                name="name"
                placeholder="Имя"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Markup.Inner>
            <Markup.Inner>
              <Markup.Error>
                {touched.surname && errors.surname && "Поле фамилия обязательно к заполнению"}
              </Markup.Error>
              <Markup.Input
                type="text"
                name="surname"
                placeholder="Фамилия"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
              />
            </Markup.Inner>
            <Markup.Inner>
              <Markup.Error>{touched.password && errors.password && "Введите пароль"}</Markup.Error>
              <Markup.Input
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Markup.Inner>
            <Markup.Inner>
              <Markup.Error>{touched.confirmPassword && errors.confirmPassword}</Markup.Error>
              <Markup.Input
                type="password"
                name="confirmPassword"
                placeholder="Подвердите пароль"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </Markup.Inner>
            <Markup.Inner>
              <Markup.Error>{touched.email && errors.email}</Markup.Error>
              <Markup.Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                onBlur={handleBlur}
                value={values.email}
              />
            </Markup.Inner>
            <Markup.Inner>
              <Markup.Error>{touched.confirmEmail && errors.confirmEmail}</Markup.Error>
              <Markup.Input
                type="email"
                name="confirmEmail"
                placeholder="подтвердите Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmEmail}
              />
            </Markup.Inner>

            <Markup.Button disabled={!isValid && !dirty} type="submit">
              Отправить
            </Markup.Button>
          </Markup.Form>
        )}
      </Formik>
    </Markup.Container>
  );
};
