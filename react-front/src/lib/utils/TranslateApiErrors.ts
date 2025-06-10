export const ERROR_MESSAGES: Record<string, string> = {
  // AuthErrors
  AUTH_0001: "Conta já existe",
  AUTH_0002: "Usuário já existe",
  AUTH_0003: "Erro ao enviar email",
  AUTH_0004: "Código inválido",
  AUTH_0005: "Código já validado",
  AUTH_0006: "Usuário não encontrado",
  AUTH_0007: "Token de atualização inválido",
  AUTH_0008: "Token de atualização expirado",
  AUTH_0009: "Senha inválida",
  AUTH_0010: "Conta inativa",
  AUTH_0011: "Email de usuário já existe",

  // AccountErrors
  ACCOUNT_0001: "Conta não encontrada",
  ACCOUNT_0002: "Falha ao criar conta",
  ACCOUNT_0003: "Falha ao atualizar conta",
  ACCOUNT_0004: "Falha ao excluir conta",

  // AppointmentReasonErrors
  APPT_REASON_0001: "Motivo de agendamento não encontrado",
  APPT_REASON_0002: "Falha ao criar motivo de agendamento",
  APPT_REASON_0003: "Falha ao atualizar motivo de agendamento",
  APPT_REASON_0004:
    "Falha ao alternar status de ativo do motivo de agendamento",

  // ClinicErrors
  CLINIC_0001: "Clínica não encontrada",
  CLINIC_0002: "CNPJ da clínica já existe",
  CLINIC_0003: "CPF de usuário já existe",
  CLINIC_0004: "Email de usuário já existe",
  CLINIC_0005: "Usuário associado não encontrado na clínica",
  CLINIC_0006: "Usuário associado não encontrado",
  CLINIC_0007: "Falha ao criar clínica",
  CLINIC_0008: "Falha ao atualizar clínica",
  CLINIC_0009: "Falha ao alternar status ativo da clínica",
  CLINIC_0010: "Clínica não encontrada",

  // FileErrors
  FILE_0001: "Arquivo não encontrado",
  FILE_0002: "Falha ao criar registro de arquivo",
  FILE_0003: "Falha ao enviar arquivo para CDN",

  // PacientErrors
  PACIENT_0001: "Paciente não encontrado",
  PACIENT_0002: "CPF de paciente já existe",
  PACIENT_0003: "Usuário associado não encontrado no paciente",
  PACIENT_0004: "Usuário associado não encontrado",
  PACIENT_0005: "Falha ao criar paciente",
  PACIENT_0006: "Falha ao atualizar paciente",
  PACIENT_0007: "Falha ao alternar status ativo do paciente",

  // CouncilErrors
  COUNCIL_0001: "Conselho não existe",
  COUNCIL_0002: "CRM ou COREN já existe",

  // ProfessionalErrors
  PROFESSIONAL_0001: "Profissional não encontrado",
  PROFESSIONAL_0002: "Usuário associado não encontrado no profissional",
  PROFESSIONAL_0003: "Usuário associado não encontrado",
  PROFESSIONAL_0004: "CPF de profissional já existe",
  PROFESSIONAL_0005: "CRM ou COREN já existe",
  PROFESSIONAL_0006: "CouncilId é obrigatório ao atualizar CRM/COREN",
  PROFESSIONAL_0007: "Este CRM pertence a outro usuário",
  PROFESSIONAL_0008: "Este COREN pertence a outro usuário",
  PROFESSIONAL_0009: "Falha ao criar profissional",
  PROFESSIONAL_0010: "Falha ao atualizar profissional",
  PROFESSIONAL_0011: "Falha ao alternar status ativo do profissional",
  PROFESSIONAL_0012: "Apenas um de CRM ou COREN deve ser fornecido",

  // SpecialtyErrors
  SPECIALTY_0001: "Especialidade não encontrada",
  SPECIALTY_0002: "Falha ao criar especialidade",
  SPECIALTY_0003: "Falha ao atualizar especialidade",
  SPECIALTY_0004: "Falha ao alternar status ativo da especialidade",

  // UserErrors
  USER_0001: "Usuário não encontrado",
  USER_0002: "Email de usuário já existe",
  USER_0003: "CPF de usuário já existe",
  USER_0004: "Senha inválida",
  USER_0005: "Falha ao criar usuário",
  USER_0006: "Falha ao atualizar usuário",
  USER_0007: "Falha ao excluir usuário",
};

export function getErrorMessage(code: string, fallback?: string): string {
  return (
    ERROR_MESSAGES[code] ??
    fallback ??
    "Ocorreu um erro, tente novamente mais tarde"
  );
}
