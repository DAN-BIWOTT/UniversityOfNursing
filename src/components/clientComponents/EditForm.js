import React from "react";
import styled from "styled-components";

const EditForm = ({ id }) => {
  return (
    <Container>
      <ModalTitle> Edit User Name </ModalTitle>
      <Form>
        <ModalBody>
          <InputWrapper>
            <Label>Input Name</Label>
            <Input placeholder="Input Name" />
          </InputWrapper>
          <InputWrapper>
            <Label>Input Email</Label>
            <Input placeholder="Input Email" />
          </InputWrapper>
        </ModalBody>
        <ModalFooter></ModalFooter>
        <hr />
        <Button>Sumit</Button>
      </Form>
    </Container>
  );
};

export default EditForm;
const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const InputWrapper = styled.div`
  margin-left: 1rem;
`;

const Label = styled.h2`
  font-weight: 500;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Input = styled.input`
  width: 75%;
  height: 7vh;
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &:hover {
    transform: translateY(-3px);
  }
  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  margin-bottom: 20px;
`;

const ModalTitle = styled.div`
  width: 70vw;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
`;

const Form = styled.div``;

const ModalFooter = styled.div``;

const Button = styled.button`
  background-color: #0000ff; /* blue */
  border: none;
  border-radius: 5px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  height: auto;
  min-height: 2rem;
  min-width: 4rem;
  justify-content: center;
  margin-left: 40%;
`;
