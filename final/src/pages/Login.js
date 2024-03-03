import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../css/Login.css";
const LoginSchema = Yup.object().shape({
  email: Yup.string().label("Email").required().min(5).max(30),
  password: Yup.string().label("Password").required().min(5).max(30),
});

const Login = () => (
  <div class="login-body">
  <Formik
    initialValues={{
      email: "",
      password: "",
    }}
    validationSchema={LoginSchema}
    onSubmit={(values) => {
      // same shape as initial values
      console.log(values);
    }}
  >
    {({ errors, touched }) => (
      <div class="wrapper">
        <Form>
          <h1>Login</h1>
          <div class="input-box">
            <Field
              name="email"
              placeholder="Email"
              className="input"
              required
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>

          <div class="input-box">
            <Field
              name="password"
              placeholder="Password"
              className="input"
              required
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br></br>
          </div>

          <button className="button" type="submit">
            Login
          </button>

          <div class="register-link">
            <p>Don't have an account? Register</p>
          </div>
        </Form>
      </div>
    )}
  </Formik>
  </div>
);

export default Login;
