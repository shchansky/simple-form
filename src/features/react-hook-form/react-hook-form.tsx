import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import type { ReactHookFormFields, Options } from "./react-hook-form.types";

const options: Options[] = [
  {
    value: "russia",
    label: "Russia",
  },
  {
    value: "usa",
    label: "USA",
  },
  {
    value: "germany",
    label: "Germany",
  },
  {
    value: "france",
    label: "France",
  },
];

const getValue = (value: string) => {
  if (value) return options.find((option) => option.value === value);
  return "";
};

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    /** Очистка формы */
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
    // mode: "onBlur",
    mode: "onChange",
  });

  //TODO: для отправки данных на сервер
  const onSubmit: SubmitHandler<ReactHookFormFields> = (data) => {
    console.log(data);
    /** Очистка формы */
    reset();
  };

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("name", {
              /** Валидация(текст ошибки) */
              required: "Name is require field!",
            })}
            type="text"
            placeholder="Name"
          />
          {errors.name && (
            <div style={{ color: "red" }}>{errors.name.message}</div>
          )}
        </div>

        <div>
          <input
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
          {errors.email && (
            <div style={{ color: "red" }}>{errors.email.message}</div>
          )}
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
                options={options}
                value={getValue(value)}
                onChange={(newValue) => onChange(newValue as Options)}
              />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </>
          )}
        />

        <div>
          <button type="submit">Send</button>
        </div>
      </form>
      <div>
        <button
          onClick={() => {
            setValue("name", "Michail");
            setValue("email", "michail@any.ry");
          }}
        >
          Field data
        </button>
      </div>
    </div>
  );
};
