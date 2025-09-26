import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  
  const handleAddContact = async (contact) => {
  try {
    const resp = await fetch("https://playground.4geeks.com/contact/agendas/Agenda-1/contacts", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...contact, agenda_slug: "Agenda-1" }),
    });

    if (!resp.ok) {
      throw new Error("Error al crear contacto");
    }

    const newContact = await resp.json();
    dispatch({ type: "addContact", payload: newContact });
    navigate("/"); 
  } catch (error) {
    console.error("Error al agregar contacto:", error);
  }
};

  return (
    <div className="text-center mt-5">
      <h2 className="mb-4">Add a Contact</h2>
      <Input onAddContact={handleAddContact} />
      
    </div>
  );
};

export default AddContact;