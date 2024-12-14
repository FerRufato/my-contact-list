import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactsList";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 32px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  return (
    <Container>
      <h1>Lista de Contatos</h1>
      <AddContactForm />
      <ContactList />
    </Container>
  );
};

export default App;
