import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css';

const Register = ({
  values, errors, touched, status
}) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    console.log("status has changed", status);
    status && setUser(user => [
      ...user, status
    ]);
  }, [status]);
  return (
    <div className = "register">
      <Form>
      <div className = "username">
        <label>
          Username:
        </label>
        <Field
        type="text"
        name="username"
        />
        {touched.username &&
        errors.username && (
          <p>{errors.username}</p>
        )}
        </div>
        <div className = "password">
        <label>
          Password:
        </label>
        <Field
        type = "text"
        name = "password"
        />
        {touched.password &&
        errors.password && (
          <p>{errors.password}</p>
        )}
        </div>
        <div className = "checkbox">
        <label>
          I am an instructor
         <Field 
        type="checkbox"
        name="isInstructor"
        checked={values.isInstructor}
        />
        </label>
        </div>
        <button type = "submit">Register</button>
      </Form>
      {user.map(users => (
        <ul key = {users.id}>
            <li>username: {users.username}</li>
            <li>password: {users.password}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikRegister = withFormik({
  mapPropsToValues({
    username,
    password,
    isInstructor
  }) {
    return {
      username: "",
      password: "",
      isInstructor: isInstructor || false
    };
  },
validationSchema: Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
}),
handleSubmit(values, {setStatus}) {
  console.log("submitting");
  axios
      .post(
        "https://anywhere-fitness-bw.herokuapp.com/auth/register/",
        values
      )
      .then(res => {
        console.log("success", res);
      })
      .catch(err =>
        console.log(err.response)
        );
        }
})(Register);
export default FormikRegister;
