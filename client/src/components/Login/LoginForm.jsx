import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { loginAccount } from "../../api/auth";
import logo from "../../assets/icons/logo.png";
import toast from "react-hot-toast";
import styles from "./loginform.module.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("* Email is required"),

    password: Yup.string()
      .required("* Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  const handleLogin = async (value, { resetForm }) => {
    try {
      const res = await loginAccount(value);
      if (res?.token && res?.name) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.name);
        toast.success(`${res.message}`);
        navigate("/");
        resetForm();
      }
    } catch (error) {
      resetForm();
      return toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignInSchema}
      onSubmit={(value, { resetForm }) => handleLogin(value, { resetForm })}
    >
      {(formik) => (
        <div className={styles.container}>
          <div className={styles.inner_container}>
            <span className={styles.logo_header}>
              <img src={logo} alt="logo" />
              <h1>Musicart</h1>
            </span>
            <Form className={styles.form_container}>
              <p className={styles.form_heading}>Sign in</p>
              <label>Enter your email or mobile number</label>
              <input type="text" />
              <label>Password</label>
              <input type="password" />
              <button type="button" className={styles.login_button}>Continue</button>
              <p className={styles.privacy_para}>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </Form>

          <span className={styles.stroke_container}>
            <hr className={styles.stroke}/>
            <p>New to Musicart?</p>
            <hr className={styles.stroke}/>
          </span>

          <button className={styles.signup_button} type="button">Create your Musicart account</button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
