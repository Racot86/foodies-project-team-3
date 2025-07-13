import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, FieldInput } from "@/components/ui";
import styles from "./SignInForm.module.css";
import { useAuthRedux } from "@/hooks/useAuthRedux";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

const SignInForm = ({ onClose }) => {
  const { login, isSignInLoading } = useAuthRedux();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isFormValid =
    !emailValue || !passwordValue || errors.email || errors.password;

  const submitHandler = async (data) => {
    try {
      await login(data);
      onClose();
    } catch (err) {
      toast.error(err || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <FieldInput
          style="rounded"
          name="email"
          type="text"
          placeholder="Email*"
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <FieldInput
          style="rounded"
          name="password"
          type="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
          required
        />

        <Button
          variant={Button.variants.PRIMARY}
          type="submit"
          disabled={isSignInLoading || isFormValid}
          isLoading={isSignInLoading}
          className={styles.fullWidth}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
