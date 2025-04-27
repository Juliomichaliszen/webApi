using System.ComponentModel.DataAnnotations;

namespace App.Models
{
    public class Paciente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public string Cpf { get; set; } = string.Empty;
        // DateTime aqui mas pode apenas passar no formato de yyyy-mm-dd que ele grava com a hora zerada
        public DateTime DataNascimento { get; set; }

    }
}