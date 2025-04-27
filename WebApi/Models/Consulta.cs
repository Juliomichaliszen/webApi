using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    public class Consulta
    {
        [Key]
        public int Id { get; set; }

        [Required]
        // DateTime aqui mas pode apenas passar no formato de yyyy-mm-dd que ele grava com a hora zerada
        public DateTime DataHora { get; set; }
        // Por uma quest�o de boas pr�ticas, se coloca o id e tamb�m o objeto navegavel do entity framwork para que possamos controlar o ID da FK que ser� gravado no banco de dados
        [ForeignKey("Paciente")]
        public int PacienteId { get; set; }
        public Paciente? Paciente { get; set; }

        [ForeignKey("Medico")]
        public int MedicoId { get; set; }
        public Medico? Medico { get; set; }
    }
}