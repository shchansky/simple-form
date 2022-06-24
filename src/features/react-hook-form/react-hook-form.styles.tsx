import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  display: block;
  width: 300px;
  height: 30px;
  border: 1px solid blue;
  border-radius: 4px;
`;

export const Error = styled.div`
  height: 15px;
  text-align: left;
  font-size: 12px;
  color: red;
`;

export const Button = styled.button``;
