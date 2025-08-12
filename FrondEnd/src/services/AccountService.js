import axios from "axios"
import { accountsReducer } from "../reducers/accountsReducer";
import { useParams } from "react-router-dom";


const BASE_URL = "http://localhost:8080/accounts";

const clientegenerico = {
    id: 1,
    nombre: "Pedro",
    paterno: "Castillo",
    materno: "Reyes",
    tipoDocumento: "NIT",
    documentoIdentidad: "12345678",
    fechaNacimiento: "1980-06-10",
    genero: "Masculino"
}

export const findAll = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response;
    } catch (error) {
        console.error("Error fetching accounts:", error);
    }
    return null;
}

export const findAccountsByClientId = async (clientId) => {
    try {
        const response = await axios.get(`${BASE_URL}/client/${clientId}`);
        return response;
    } catch (error) {
        console.error("Error fetching accounts by client ID:", error);
    }
    return null;
} 

export const saveAccount = async ({ cliente, tipo, numeroCuenta, moneda, monto, fechaCreacion, sucursal}) => {
    try {
        // Preparar payload con validaciones básicas
        const payload = {
            tipo: tipo?.trim(),
            numeroCuenta: numeroCuenta?.trim(),
            moneda: moneda?.trim(),
            monto: parseFloat(monto),
            fechaCreacion: fechaCreacion,
            sucursal: sucursal?.trim(),
            cliente: { id: parseInt(cliente.id) } // Asegurar que sea número si es necesario
        };

        console.log("Enviando payload:", payload);

        const response = await axios.post("http://localhost:8080/accounts", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response;
    } catch (error) {
        console.error("Error creating account:", error);
        if (error.response) {
            console.error("Server responded with:", error.response.data);
            console.error("Status code:", error.response.status);
        }
        throw error; 
    }
};



// Hook personalizado para obtener el clientId de la URL
export const useClientId = () => {
    const { clientId } = useParams();
    return clientId;
};

export const updateAccount = async ({id, tipo, numeroCuenta, moneda, monto, fechaCreacion, sucursal, client}) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            id,
            tipo,
            numeroCuenta,
            moneda,
            monto,
            fechaCreacion,
            sucursal,
            client,
        });
        return response;
    } catch (error) {
        console.error("Error updating account:", error);
    }
    return null;
};

export const deleteAccount = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting account:", error);
    }
    return null;
};
