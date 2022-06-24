import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as consts from "./react-hook-form.consts";
import * as Markup from "./react-hook-form.styles";
import type { ReactHookFormFields, Options } from "./react-hook-form.types";

const getValue = (value: string) => {
  if (value) return consts.mockSelectOptions.find((option) => option.value === value);
  return "";
};

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    /** Очистка формы после submit */
    reset,
    watch,
    /**
     * автозаполнение формы
     * setValue("name", "Michail")
     * указать какое имя заполнять и  чем заполнять
     *  */
    setValue,
    control,
  } = useForm<ReactHookFormFields>({
    defaultValues: {
      email: "any@any.ry",
    },
    /** mode: настройка режима */
    mode: "onChange",
    // mode: "onBlur",
  });

  /** Отправки данных на сервер */
  const onSubmit: SubmitHandler<ReactHookFormFields> = (data) => {
    alert(`${JSON.stringify(data)}`);
    /** Очистка формы */
    reset();
  };

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Markup.Container>
      <Markup.Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Markup.Error>{errors.name && errors.name.message}</Markup.Error>
          <Markup.Input
            {...register("name", {
              /** Валидация(текст ошибки) */
              required: "Name is require field!",
            })}
            type="text"
            placeholder="Name"
          />
        </div>

        <div>
          <Markup.Input
            {...register("surname", {
              /** Валидация(текст ошибки) */
              required: "Surname is require field!",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
            type="text"
            placeholder="Surname"
          />
        </div>

        <div>
          <Markup.Input
            {...register("email", {
              /** Валидация(текст ошибки) */
              required: "Email is require field!",
              pattern: {
                /** Регулярное выражение для проверки на валидность */
                value:
                  // eslint-disable-next-line
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: "Please enter valid email!",
              },
            })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email.message}</div>}
        </div>

        <Controller
          control={control}
          name="address.country"
          rules={{
            required: "Country is require!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <ReactSelect
                placeholder="Countries"
                options={consts.mockSelectOptions}
                value={getValue(value)}
                onChange={(newValue) => onChange(newValue as Options)}
              />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </>
          )}
        />

        <div>
          <Markup.Button type="submit" disabled={!isValid}>
            Send
          </Markup.Button>
        </div>
      </Markup.Form>
      <div>
        <Markup.Button
          onClick={() => {
            setValue("name", "Michail");
            setValue("email", "michail@any.ry");
          }}>
          Кнопка автозаполнения формы
        </Markup.Button>
      </div>
    </Markup.Container>
  );
};
