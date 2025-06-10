import { Paciente } from "../types/Paciente";
import api from "./api";

export type CreatePacientePayload = Omit<Paciente, "id">;
export type UpdatePacientePayload = Omit<Paciente, "id">;

/**
 * @returns
 */

export async function getPacientes(): Promise<Paciente[]> {
  const response = await api.get("/getPacientes");
  return response.data;
}

/**
 * @param payload
 * @returns
 */
export async function createPaciente(
  payload: CreatePacientePayload
): Promise<Paciente> {
  const response = await api.post("/createPaciente", payload);
  return response.data;
}

/**
 * @param id
 * @param payload
 * @returns
 */
export async function updatePaciente(
  id: number,
  payload: UpdatePacientePayload
): Promise<Paciente> {
  const response = await api.put(`/updatePaciente/${id}`, payload);
  return response.data;
}

/**
 * @param id
 */
export async function deletePaciente(id: number): Promise<void> {
  await api.delete(`/deletePaciente/${id}`);
}
