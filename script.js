// Alternar entre formulários
document.getElementById('btn-individual').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('btn-lote').classList.remove('active');
  document.getElementById('form-individual').style.display = 'block';
  document.getElementById('form-lote').style.display = 'none';
});

document.getElementById('btn-lote').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('btn-individual').classList.remove('active');
  document.getElementById('form-individual').style.display = 'none';
  document.getElementById('form-lote').style.display = 'block';
});

// Upload de arquivo (simulação)
document.querySelector('.upload-area').addEventListener('click', function() {
  document.querySelector('.upload-area input[type="file"]').click();
});

// Dados completos das raças (incluindo gestação e vacinas)
const racasDB = {
  "quarto_de_milha": {
      peso_ideal: { min: 430, max: 500 },
      vacinas_obrigatorias: ["raiva", "influenza", "tetano"],
      cuidados_gestacao: [
          "Suplementar com vitamina E e selênio",
          "Reduzir exercícios a partir do 8º mês",
          "Ultra-som aos 45 e 90 dias"
      ],
      temperatura_ideal: "15-25°C"
  },
  // ... (adicionar outras raças com dados similares)
};

document.getElementById('form-individual').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = {
      nome: document.getElementById('nome').value,
      raca: document.getElementById('raca').value,
      peso: parseFloat(document.getElementById('peso').value),
      gestacao: document.getElementById('gestacao').value,
      // ... outros campos
  };

  gerarRelatorioCompleto(formData);
});

function gerarRelatorioCompleto(animal) {
  const racaData = racasDB[animal.raca];
  let html = `<h4>Relatório de ${animal.nome}</h4>`;

  // 1. Avaliação Nutricional
  html += `<div class="box-destaque"><h5>Nutrição:</h5>`;
  if (animal.peso < racaData.peso_ideal.min) {
      html += `<p class="alerta">⚠️ Peso abaixo do ideal (${animal.peso} kg)</p>
               <p>Dieta recomendada: Ração hipercalórica + 2kg de alfafa/dia</p>`;
  } else {
      html += `<p>✅ Peso dentro da faixa ideal</p>`;
  }
  html += `</div>`;

  // 2. Cuidados Veterinários
  html += `<div><h5>Saúde:</h5><ul>`;
  racaData.vacinas_obrigatorias.forEach(vacina => {
      const dataVacina = document.getElementById(`vacina_${vacina}`).value;
      html += `<li>${vacina.toUpperCase()}: ${dataVacina || "<span class='alerta'>PENDENTE</span>"}</li>`;
  });
  html += `</ul></div>`;

  // 3. Gestação (se aplicável)
  if (animal.gestacao !== "nao") {
      html += `<div class="box-destaque"><h5>Cuidados na Gestação:</h5><ul>`;
      racaData.cuidados_gestacao.forEach(cuidado => {
          html += `<li>${cuidado}</li>`;
      });
      html += `</ul></div>`;
  }

  // 4. Dicas Gerais
  html += `<div><h5>Recomendações:</h5>
           <p>Temperatura ideal: ${racaData.temperatura_ideal}</p>
           <p>Exercícios: ${animal.gestacao === "nao" ? "5x/semana" : "3x/semana (leves)"}</p></div>`;

  document.getElementById('recomendacao-nutricional').innerHTML = html;
  document.getElementById('avaliacao-nutricional').style.display = 'block';
}