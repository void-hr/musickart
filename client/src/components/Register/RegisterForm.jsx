import { Link, useNavigate } from "react-router-dom";
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
      .min(4, "Too Short!")
      .max(50, "Too Long!")
      .required("* Name is required"),
    mobile: Yup.string().required("* Enter your mobile number").matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    email: Yup.string().email().required("* Email is required"),

    password: Yup.string()
      .required("* Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),

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
        mobile: "",
        email: "",
        password: "",
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
            <span className={styles.mobile_welcome_header}>
              <p className={styles.welcome_para}>Welcome</p>
            </span>
            <Form className={styles.form_container}>
              <p className={styles.form_heading}>Create Account</p>
              <label>Your name</label>
              <input type="text" 
              id="name"
              onChange={formik.handleChange}
              className={formik.errors.name ? styles.input_error : ""}/>
              {formik.errors.name && <p  className={styles.error_para}>{formik.errors.name}</p>}

              <label>Mobile Number</label>
              <input type="text" 
              id="mobile"
              onChange={formik.handleChange}
              className={formik.errors.mobile ? styles.input_error : ""}/>
              {formik.errors.mobile && <p  className={styles.error_para}>{formik.errors.mobile}</p>}

              <label>Email Id</label>
              <input type="email" 
              id="email"
              onChange={formik.handleChange}
              className={formik.errors.email ? styles.input_error : ""}/>
              {formik.errors.email && <p  className={styles.error_para}>{formik.errors.email}</p>}

              <label>Password</label>
              <input type="password" 
              id="password"
              onChange={formik.handleChange}
              className={formik.errors.password ? styles.input_error : ""}/>
              {formik.errors.password && <p  className={styles.error_para}>{formik.errors.password}</p>}

              <p className={styles.confirm_para}>
                By enrolling your mobile phone number, you consent to receive
                automated security notifications via text message from Musicart.
                Message and data rates may apply.
              </p>
              <button type="button" className={styles.signup_button} onClick={formik.handleSubmit}>
                Continue
              </button>
              <p className={styles.privacy_para}>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </Form>
            <span className={styles.signin_redirect}>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
