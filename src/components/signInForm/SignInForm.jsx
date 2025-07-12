import React from "react";
import { Formik, FormikProvider, useFormik } from "formik";
import { Button, FieldInput } from "@/components/ui";
import styles from "./SignInForm.module.css";

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className={styles.formContainer}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <FieldInput
            style="rounded"
            name="email"
            type="email"
            placeholder="Email*"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
          <FieldInput
            style="rounded"
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
          <Button
            variant={Button.variants.PRIMARY}
            type="submit"
            disabled={!formik.values.email || !formik.values.password}
            className={styles.fullWidth}
          >
            Sign In
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default SignInForm;
