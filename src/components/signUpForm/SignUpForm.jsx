import React from "react";
import { FormikProvider, useFormik } from "formik";
import { Button, FieldInput, Text } from "@/components/ui";
import styles from "./SignUpForm.module.css";

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
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
            name="name"
            type="text"
            placeholder="Name*"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
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
            disabled={
              !formik.values.name ||
              !formik.values.email ||
              !formik.values.password
            }
            className={styles.fullWidth}
          >
            Create
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default SignUpForm;
