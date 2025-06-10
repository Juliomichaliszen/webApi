import { Consulta } from "../types/Consulta";
import api from "./api";

export type CreateConsultaPayload = {
  dataHora: string;
  pacienteId: number;
  medicoId: number;
};

export type UpdateConsultaPayload = CreateConsultaPayload;

/**
 * @returns
 */
export async function getConsultas(): Promise<Consulta[]> {
  const response = await api.get("/getConsultas");
  return response.data;
}

export async function createConsulta(
  payload: CreateConsultaPayload
): Promise<Consulta> {
  const response = await api.post("/createConsulta", payload);
  return response.data;
}

/**
 * @param id
 * @param payload
 * @returns
 */
export async function updateConsulta(
  id: number,
  payload: UpdateConsultaPayload
): Promise<Consulta> {
  const response = await api.put(`/updateConsulta/${id}`, payload);
  return response.data;
}

/**
 * @param id
 */
export async function deleteConsulta(id: number): Promise<void> {
  await api.delete(`/deleteConsulta/${id}`);
}
