import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeContact, editContact } from "../store/slices/contactsSlice";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ccc;

`;

const Button = styled.button`
  margin-left: 8px;
`;

const Input = styled.input`
  margin-right: 8px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContact, setEditedContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const startEditing = (contact: { id: string; name: string; email: string; phone: string }) => {
    setEditingId(contact.id);
    setEditedContact({ name: contact.name, email: contact.email, phone: contact.phone });
  };

  const saveEdit = () => {
    if (editingId) {
      dispatch(editContact({ id: editingId, ...editedContact }));
      setEditingId(null);
    }
  };

  return (
    <List>
      {contacts.map(contact => (
        <ListItem key={contact.id}>
          {editingId === contact.id ? (
            <>
              <Input
                type="text"
                value={editedContact.name}
                placeholder="Nome"
                onChange={e => setEditedContact({ ...editedContact, name: e.target.value })}
              />
              <Input
                type="email"
                value={editedContact.email}
                placeholder="E-mail"
                onChange={e => setEditedContact({ ...editedContact, email: e.target.value })}
              />
              <Input
                type="tel"
                value={editedContact.phone}
                placeholder="Telefone"
                onChange={e => setEditedContact({ ...editedContact, phone: e.target.value })}
              />
              <Button onClick={saveEdit}>Salvar</Button>
              <Button onClick={() => setEditingId(null)}>Cancelar</Button>
            </>
          ) : (
            <>
              <span>{contact.name} - {contact.email} - {contact.phone}</span>
              <div>
                <Button onClick={() => startEditing(contact)}>Editar</Button>
                <Button onClick={() => dispatch(removeContact(contact.id))}>Remover</Button>
              </div>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
