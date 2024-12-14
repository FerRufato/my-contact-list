import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../store/slices/contactsSlice";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Input = styled.input`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    dispatch(addContact({ id: nanoid(), name, email, phone }));
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} />
      <Button type="submit">Adicionar Contato</Button>
    </Form>
  );
};

export default AddContactForm;
