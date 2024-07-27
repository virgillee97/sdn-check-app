import { Button, Card, DatePicker, Form, Typography } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  max-width: 600px;
  margin-top: 10px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormSection = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 24px 74px 24px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
`;

export const SubmitButton = styled(Button)`
  margin-right: 10px;
  width: 129px;
`;

export const ResetButton = styled(Button)`
  width: 129px;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

export const DescriptionTitle = styled(Typography.Title)`
  text-align: "center";
`;
