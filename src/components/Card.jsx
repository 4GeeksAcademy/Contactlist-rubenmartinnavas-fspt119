import React from "react";
import { Link } from "react-router-dom";

const Card = ({ contacts, onDeleteContact }) => {
  return (
    <>
      {contacts.map(contact => (
        <div
          key={contact.id}
          className="card mb-3 p-3 d-flex flex-row align-items-center shadow-sm">

          <img
            src={`https://picsum.photos/seed/${contact.id}/150/150`}
            alt="Contacto"
            className="rounded-circle p-3"
          />

          <div className="flex-grow-1 text-start">
            <h5 className="mb-1">{contact.name}</h5>
            <p className="mb-1 text-muted">{contact.address}</p>
            <p className="mb-1 text-muted">{contact.phone}</p>
            <p className="mb-0 text-muted">{contact.email}</p>
          </div>

          <div className="ms-5 d-flex flex-column">

            <Link to={`/edit-contact/${contact.id}`}>
              <button className="btn btn-warning p-3 m-2">
                Editar
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-danger p-3 m-3"
              onClick={() => onDeleteContact(contact.id)}>
              borrar
            </button>

          </div>

        </div>

      ))}
    </>
  );
};

export default Card;

