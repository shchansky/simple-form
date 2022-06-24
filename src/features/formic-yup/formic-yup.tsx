import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";


export const FormicYup = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательно"),
    secondName: yup.string().required("Обязательно"),
    password: yup.string().required("Обязательно"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Обязательно к заполнению"),
    email: yup.string().email("Введите верный e-mail").required("Обязательно к заполнению"),
    confirmEmail: yup
      .string()
      .email("Введите верный e-mail")
      .oneOf([yup.ref("email")], "email не совпадают")
      .required("Обязательно к заполнению"),
  });

  return (
    <div>
      <Formik
        initialValues={{ name: "", secondName: "", password: "", confirmPassword: "", email: "", confirmEmail: "" }}
        validateOnBlur
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validationSchema}>
        {({ values, errors, touched, handleChange, handleBlur, isValid, dirty, handleSubmit }) => (
          <Form className="form">
            <div>
              <label htmlFor="name">Имя</label>
              <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
            </div>
            {touched.name && errors.name && <div style={{ color: "red" }}>Поле имя обязательно к заполнению</div>}

            <div>
              <label htmlFor="secondName">Фамилия</label>
              <input
                type="text"
                name="secondName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondName}
              />
            </div>
            {touched.secondName && errors.secondName && (
              <div style={{ color: "red" }}>Поле фамилия обязательно к заполнению</div>
            )}

            <div>
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            {touched.password && errors.password && <div style={{ color: "red" }}>Введите пароль</div>}

            <div>
              <label htmlFor="confirmPassword">Подвердите пароль</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <div style={{ color: "red" }}>{errors.confirmPassword}</div>
            )}

            <div>
              <label htmlFor="email">email</label>
              <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
            </div>
            {touched.email && errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

            <div>
              <label htmlFor="confirmEmail">confirmEmail</label>
              <input
                type="email"
                name="confirmEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmEmail}
              />
            </div>
            {touched.confirmEmail && errors.confirmEmail && <div style={{ color: "red" }}>{errors.confirmEmail}</div>}

            <button disabled={!isValid && !dirty} type="submit">
              Отправить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
