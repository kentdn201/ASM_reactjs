import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { loginService } from "../../services/service";
import "./LoginPage.css";

const LoginPage = ({ title }) => {
  // All useState
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // validate funciton
  const validateEmail = (email) => {
    if (!email) return "Required";
    const isValidEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? ""
      : "Invalid Email";

    if (isValidEmail) return "Invalid Email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Required";
    if (password.length < 8) {
      return "At least 8 characters";
    }
    return "";
  };
  // end validate function

  // errors
  const errors = {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };

  console.log(errors);
  // end errors

  // touched
  const handleInputBlur = (evt) => {
    setTouched({
      ...touched,
      [evt.target.name]: true,
    });
  };
  // end touched

  const handleInputChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    loginService().then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      window.location.reload();
    });
  };

  return (
    <div>
      <Form className="formLogin" onSubmit={handleOnSubmit}>
        <div>{title && <h5>{title}</h5>}</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            name="email"
            required
            isValid={!errors.email}
          />
          {touched.email && (
            <p style={{ margin: 10, color: "red" }}>{errors.email}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            name="password"
            isValid={!errors.password}
          />
        </Form.Group>
        {touched.password && (
          <p style={{ margin: 10, color: "red" }}>{errors.password}</p>
        )}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
