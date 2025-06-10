import { Medico } from "../types/Medico";
import api from "./api";

export type CreateMedicoPayload = Omit<Medico, "id">;
export type UpdateMedicoPayload = Omit<Medico, "id">;

/**
 * @returns
 */
export async function getMedicos(): Promise<Medico[]> {
  const response = await api.get("/getMedicos");
  return response.data;
}

/**
 * @param payload
 * @returns
 */
export async function createMedico(
  payload: CreateMedicoPayload
): Promise<Medico> {
  const response = await api.post("/createMedico", payload);
  return response.data;
}

/**
 * @param id
 * @param payload
 * @returns
 */
export async function updateMedico(
  id: number,
  payload: UpdateMedicoPayload
): Promise<Medico> {
  const response = await api.put(`/updateMedico/${id}`, payload);
  return response.data;
}

/**
 * @param id
 */
export async function deleteMedico(id: number): Promise<void> {
  await api.delete(`/deleteMedico/${id}`);
}
