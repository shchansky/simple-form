import styled from "styled-components";
import { Form as FormComponent } from "formik";

export const Container = styled.div``;

export const Header = styled.h3`
  margin: 0;
`;

export const Form = styled(FormComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const Inner = styled.div``;

export const Error = styled.div`
  height: 15px;
  text-align: left;
  font-size: 12px;
  color: red;
`;

export const Input = styled.input`
  display: block;
  width: 300px;
  height: 30px;
  border: 1px solid blue;
  border-radius: 4px;
`;

export const Button = styled.button``;
