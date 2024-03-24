import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import styles from "./registerform.module.css";
import { registerAccount } from "../../api/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmpassword: false,
  });

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("* Name is required"),

    email: Yup.string().email().required("* Email is required"),

    password: Yup.string()
      .required("* Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),

    confirmpassword: Yup.string()
      .required("* Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const handleCreateAccount = async (value, { resetForm }) => {
    try {
      const res = await registerAccount(value);
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
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={(value, { resetForm }) =>
        handleCreateAccount(value, { resetForm })
      }
    >
      {(formik) => (
        <div className={styles.container}>
          <div className={styles.inner_container}>
            <span className={styles.logo_header}>
              <img src={logo} alt="logo" />
              <h1>Musicart</h1>
            </span>
            <Form className={styles.form_container}>
              <p className={styles.form_heading}>Create Account</p>
              <label>Your name</label>
              <input type="text" />
              <label>Mobile Number</label>
              <input type="text" />
              <label>Email Id</label>
              <input type="email" />
              <label>Password</label>
              <input type="password" />
              <p className={""}>
                By enrolling your mobile phone number, you consent to receive
                automated security notifications via text message from Musicart.
                Message and data rates may apply.
              </p>
              <button type="button" className={styles.signup_button}>
                Continue
              </button>
              <p className={styles.privacy_para}>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </Form>
            <span className={styles.signin_redirect}>
              Already have an account? <a href="/login">Sign in</a>
            </span>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
