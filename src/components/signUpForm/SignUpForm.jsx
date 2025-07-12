import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, FieldInput, Text } from "@/components/ui";
import styles from "./SignUpForm.module.css";
import { useAuthRedux } from "@/hooks/useAuthRedux";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
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

const SignUpForm = ({ onClose }) => {
  const { register: registerUser, isSignUpLoading } = useAuthRedux();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isFormValid =
    !nameValue ||
    !emailValue ||
    !passwordValue ||
    errors.name ||
    errors.email ||
    errors.password;

  const submitHandler = async (data) => {
    try {
      await registerUser(data);
      onClose();
    } catch (err) {
      toast.error(err || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <FieldInput
          style="rounded"
          name="name"
          type="text"
          placeholder="Name*"
          {...register("name")}
          error={errors.name?.message}
          required
        />
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
          disabled={isSignUpLoading || isFormValid}
          isLoading={isSignUpLoading}
          className={styles.fullWidth}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
