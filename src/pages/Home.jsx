import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		async function initAgenda() {
			try {
				
				let resp = await fetch(
					"https://playground.4geeks.com/contact/agendas/Agenda-1/contacts"
				);

				if (resp.status === 404) {
					console.log("Agenda no encontrada, creando...");
					
					const createResp = await fetch(
						"https://playground.4geeks.com/contact/agendas/Agenda-1",
						{ method: "POST" }
					);

					if (!createResp.ok) {
						const errorData = await createResp.json();
						console.error("Error al crear agenda:", errorData);
						return;
					}

					
					resp = await fetch(
						"https://playground.4geeks.com/contact/agendas/Agenda-1/contacts"
					);
				}

				const data = await resp.json();
				dispatch({ type: "setContacts", payload: data.contacts || [] });
			} catch (error) {
				console.error("Error al inicializar agenda o contactos:", error);
			}
		}

		initAgenda();
	}, [dispatch]);



	const handleDeleteContact = async (contactId) => {
		try {
			const resp = await fetch(
				`https://playground.4geeks.com/contact/agendas/Agenda-1/contacts/${contactId}`,
				{ method: "DELETE" }
			);

			if (!resp.ok) {
				const errorData = await resp.json();
				console.error("Error API:", errorData);
				throw new Error("Error al eliminar contacto");
			}

			const data = await fetch("https://playground.4geeks.com/contact/agendas/Agenda-1/contacts");
			const contacts = await data.json();
			dispatch({ type: "setContacts", payload: contacts.contacts });

		} catch (err) {
			console.error("Error al borrar contacto:", err);
		}
	};

	return (
		<div className="text-center">
			<Link to="/add-contact">
				<button className="btn btn-primary btn-lg m-5" type="button">
					Add Contact
				</button>
			</Link>

			<Card contacts={store.Contacts} onDeleteContact={handleDeleteContact} />
		</div>
	);
};

export default Home;