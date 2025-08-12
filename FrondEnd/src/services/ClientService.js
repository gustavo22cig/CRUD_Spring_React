import axios from "axios"

const BASE_URL = "http://localhost:8080/clients";

export const findAll = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (error) {
        console.error("Error fetching clients:", error);
    }
    return null;
}

export const saveClient = async ({ nombre, paterno, materno, tipoDocumento, documentoIdentidad, fechaNacimiento, genero }) => {
    try {
        const response = await axios.post(BASE_URL, {
            nombre,
            paterno,
            materno,
            tipoDocumento,
            documentoIdentidad,
            fechaNacimiento,
            genero
        });
        return response;
    } catch (error) {
        console.error("Error saving client:", error);
    }
    return null;
}

export const updateClient = async ({ id, nombre, paterno, materno, tipoDocumento, documentoIdentidad, fechaNacimiento, genero }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, {
            id, nombre, paterno, materno, tipoDocumento, documentoIdentidad, fechaNacimiento, genero
        });
        return response;
    } catch (error) {
        console.error("Error updating client:", error);
    }
    return null;
}

export const deleteClient = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting client:", error);
    }
}