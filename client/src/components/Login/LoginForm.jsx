import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { loginAccount } from "../../api/auth";
import logo from "../../assets/icons/logo.png";
import toast from "react-hot-toast";
import styles from "./loginform.module.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .required("* Email/Mobile is required") .test('is-email-or-mobile', 'Must be a valid email/mobile', function (value) {
        const isEmail = Yup.string().email().isValidSync(value); 
        const isMobile = Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').isValidSync(value); 
        return isEmail || isMobile;
      }),
  

    password: Yup.string()
      .required("* Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  const handleLogin = async (value, { resetForm }) => {
    try {
      const res = await loginAccount(value);
      if (res?.token && res?.name) {
        const token = res?.token
        const user =  res?.name
        login(token , user)
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
            <span className={styles.mobile_welcome_header}>
              <p className={styles.welcome_para}>Welcome</p>
            </span>
            <Form className={styles.form_container}>
              <p className={styles.form_heading}>Sign in</p>
              <label>Enter your email or mobile number</label>
              <input type="text"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={formik.errors.email ? styles.input_error : ""}
                />
              {formik.errors.email && <p  className={styles.error_para}>{formik.errors.email}</p>}
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && <p className={styles.error_para}>{formik.errors.password}</p>}
              <button type="button" className={styles.login_button}  onClick={formik.handleSubmit}>
                Continue
              </button>
              <p className={styles.privacy_para}>
                By continuing, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </Form>

            <span className={styles.stroke_container}>
              <hr className={styles.stroke} />
              <p>New to Musicart?</p>
              <hr className={styles.stroke} />
            </span>

            <button
              className={styles.signup_button}
              type="button"
             onClick={()=> navigate("/register")}
            >
              Create your Musicart account
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
