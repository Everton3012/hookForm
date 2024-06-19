"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useEffect } from "react";

const asyncFunction = async () => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("hello");
    }, 2000);
  });
  return myPromise;
};

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "A senha precisa de pelo menos 6 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas precisam ser iguais")
    .required("Campo obrigatório"),
});

export const Form = () => {
  const { register, handleSubmit, formState, reset,setFocus } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { errors, isSubmitting } = formState;

  console.log("errors", errors);

  const handleSubmitData = async (data: any) => {
    console.log("submit", data);

    await asyncFunction();

    reset();
  };

  useEffect(() => {
    setFocus('password');
  }, [setFocus])

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      <h2>Reset Passowrd</h2>

      <input {...register("password")} type="password" placeholder="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="confirmPassword"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
      <button disabled={isSubmitting} type="submit">{isSubmitting ? "Enviando..." : "Enviar"}</button>
    </form>
  );
};
