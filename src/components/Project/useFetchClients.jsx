import { useEffect, useState } from "react";

export function useFetchClients() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Error al obtener los clientes");
                    }
                    const data = await response.json();
                    setClients(data);
                } catch (error) {
                    console.log("Error al obtener clientes:", error);
                }
            }
        };
        fetchClients();
    }, []);

    return clients;
}