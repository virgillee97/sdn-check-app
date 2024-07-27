"use client";

import React, { useState } from "react";
import { Form, Input, Row, Col, notification } from "antd";
import { FormInstance } from "antd/lib/form";
import moment from "moment";
import { Typography } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { checkCustomerWithSDN } from "../../../lib/sdn-screens";
import {
  DescriptionTitle,
  FormSection,
  ResetButton,
  StyledCard,
  StyledDatePicker,
  SubmitButton,
} from "./styles";

// Define the form values interface
const { Title, Paragraph } = Typography;

export interface FormValues {
  fullName: string;
  dob: moment.Moment;
  country: string;
}

interface Result {
  isNameMatched: boolean;
  isDoBMatched: boolean;
  isCountryMatched: boolean;
}

const SDNForm: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [result, setResult] = useState<Result | null>(null);

  const isCustomerClear =
    !result?.isCountryMatched &&
    !result?.isDoBMatched &&
    !result?.isNameMatched;

  const onFinish = async (values: FormValues) => {
    try {
      const res = await checkCustomerWithSDN(values);
      setResult(res);
    } catch (e) {
      notification.error({
        message:
          "Sorry, we were not able to submit your request. Please try later.",
      });
    }
  };

  const onReset = () => {
    setResult(null);
  };

  const getStatus = () => {
    return isCustomerClear ? "Clear" : "Hit!!!";
  };

  const getIcon = (isMathed: boolean) => {
    return isMathed ? (
      <CheckCircleTwoTone twoToneColor="#90EE90" />
    ) : (
      <CloseCircleTwoTone twoToneColor="red" />
    );
  };

  const renderDescriptionSection = () => {
    return (
      <StyledCard>
        <DescriptionTitle level={2}>Welcome to SecureScreen</DescriptionTitle>
        <Paragraph>
          SecureScreen helps businesses comply with regulations by quickly and
          accurately screening customers against the Specially Designated
          Nationals (SDN) list. Ensure safe and compliant transactions with our
          easy-to-use interface and real-time updates.
        </Paragraph>
        <Title level={3}>How to Use SecureScreen:</Title>
        <Paragraph>
          1. <strong>Enter Customer Details:</strong> Input the full name, date
          of birth, and country of your customer into the provided fields.
        </Paragraph>
        <Paragraph>
          2. <strong>Submit for Screening:</strong> Click the “Submit” button to
          initiate the screening process against the Specially Designated
          Nationals (SDN) list.
        </Paragraph>
        <Paragraph>
          3. <strong>View Results:</strong> Review the results displayed below
          the form to see if the customer appears on the SDN list.
        </Paragraph>
      </StyledCard>
    );
  };

  const renderFormSection = () => {
    return (
      <StyledCard>
        <FormSection>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onReset={onReset}
            autoComplete="off"
            style={{ width: "100%", height: "100%" }}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please input your date of birth!" },
              ]}
            >
              <StyledDatePicker
                format="YYYY-MM-DD"
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current > moment(customDate, "YYYY-MM-DD");
                }} // Disable future date
              />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please input your country!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <SubmitButton type="primary" htmlType="submit">
                Submit
              </SubmitButton>
              <ResetButton type="primary" htmlType="reset">
                Reset
              </ResetButton>
            </Form.Item>
          </Form>
        </FormSection>
      </StyledCard>
    );
  };

  const renderResultSection = () => {
    return (
      <StyledCard>
        <div>
          <Row>
            <Col span={7}>
              <Typography.Title>Result:</Typography.Title>
            </Col>
            <Col span={17}>
              <Typography.Title>{result && getStatus()}</Typography.Title>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <strong>Full Name:</strong>
            </Col>
            <Col span={16}>{result && getIcon(result?.isNameMatched)}</Col>
          </Row>
          <Row>
            <Col span={8}>
              <strong>Date of Birth:</strong>
            </Col>
            <Col span={16}>{result && getIcon(result?.isDoBMatched)}</Col>
          </Row>
          <Row>
            <Col span={8}>
              <strong>Country:</strong>
            </Col>
            <Col span={16}>{result && getIcon(result?.isCountryMatched)}</Col>
          </Row>
        </div>
      </StyledCard>
    );
  };

  return (
    <div>
      {renderDescriptionSection()}
      {renderFormSection()}
      {renderResultSection()}
    </div>
  );
};

export default SDNForm;
