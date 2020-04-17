import React, { useContext } from "react";
import UserProvider from "../../../Contexts/UserProvider";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Button, Form, Input } from "antd";
import _ from "lodash";

import "./style.css";

const FormItem = Form.Item;
const Login = (props) => {
  const userData = useContext(UserProvider.context);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
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
            <Form className="registerForm" onSubmit={handleSubmit}>
              <FormItem
                label="E-Mail"
                name="email"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="registerFormInput"
                rules={[{ required: true, message: "Email is required." }]}
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
                <Input />
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
