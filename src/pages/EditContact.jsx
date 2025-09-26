import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const EditContact = () => {
  const { store } = useGlobalReducer();
  const { id: contactId } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const existing = store.Contacts.find(c => c.id === parseInt(contactId));
    if (existing) {
      setContact(existing);
    } else {
      console.error("Contacto no encontrado en store");
    }
  }, [contactId, store.Contacts]);

  const handleEditContact = async (updateContact) => {
    console.log("Editando contacto:", contactId, "con datos:", updateContact);

    try {
      const resp = await fetch(
        `https://playground.4geeks.com/contact/agendas/Agenda-1/contacts/${contactId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updateContact.name,
            email: updateContact.email,
            phone: updateContact.phone,
            address: updateContact.address
          })
        }
      );

      const data = await resp.json();
      console.log("Respuesta API:", data, "Status:", resp.status);

      if (!resp.ok) {
        throw new Error("Error al editar contacto");
      }

      navigate("/");
    } catch (err) {
      console.error("Error al editar contacto:", err);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2 className="mb-4">Edit Contact</h2>
      {contact ? (
        <Input contact={contact} onAddContact={handleEditContact} />
      ) : (
        <p>Cargando contacto...</p>
      )}
    </div>
  );
};

export default EditContact;