import React, { useContext, useState } from "react";
import UserProvider from "../../../Contexts/UserProvider";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, Input } from "antd";
import axios from "axios";
import _ from "lodash";

import "./style.css";

const FormItem = Form.Item;
const Login = (props) => {
  const userData = useContext(UserProvider.context);

  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      await axios.post("/api/auth/login", values);
      userData.getUser();
      history.push("/");
    } catch (error) {
      console.error(
        `Failed to log in. ${JSON.stringify(error.response.data.error)}`
      );
      setErrorMessage(error.response.data.error);
    }
  };

  const handleSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (!_.isEmpty(userData.user)) {
    history.push("/");
  }

  return (
    <div className="registerContainer">
      <Row className="registerCardRow">
        <Col span={6} offset={9}>
          <Card className="registerCard">
            <div className="registerLabel">
              <span>Login</span>
            </div>

            {/* REGISTRATION INFORMATION INPUT FORM */}
            <Form
              className="registerForm"
              onFinish={handleSubmit}
              onFinishFailed={handleSubmitFailed}
              onChange={() => {
                setErrorMessage(null);
              }}
            >
              {!_.isEmpty(errorMessage) && (
                <div className="authErrorContainer">{errorMessage}</div>
              )}
              <FormItem
                label="Username"
                name="username"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="registerFormInput"
                rules={[{ required: true, message: "Username is required." }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label="Password"
                name="password"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="registerFormInput"
                rules={[{ required: true, message: "Password is required." }]}
              >
                <Input.Password />
              </FormItem>
              {/* LOGIN WITH STEAM BUTTON */}
              <div className="formControlButtons">
                <span
                  className="steamLoginSubtext loginRedirect"
                  onClick={() => {
                    history.push("/auth/register");
                  }}
                >
                  Need an account?
                </span>
                <FormItem className="formRegisterButton">
                  <Button
                    className="customPrimary"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </FormItem>
              </div>
              <div className="steamButtonRegisterContainer">
                <a href="/api/auth/steam">
                  <Button className="steamLoginButton" type="primary">
                    <div className="steamLoginButtonText">
                      <span className="steamLoginSubtext">Log in with </span>
                      <span className="steamLoginMaintext">STEAM</span>
                      <i className="fab fa-steam steamLoginIcon" size="3x"></i>
                    </div>
                  </Button>
                </a>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
