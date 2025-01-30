//chave da API openweather
const chave_API = 'c479768d43795c92da5c78ba021681b6';
//armazenamento das cidades
const armazenamento_das_cidades = 'cidades';
const form = document.getElementById('addCityForm');
const cityInput = document.getElementById('cityInput');
const messageDiv = document.getElementById('message');

// Adiciona a cidade ao localstorage
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    
    if (!city) return;

    try {
        // Verifica se a cidade e valida
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${chave_API}`
        );
        
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }

        // Adicionaa a cidade ao localstorage
        const cities = JSON.parse(localStorage.getItem(armazenamento_das_cidades)) || [];
        if (!cities.includes(city)) {
            cities.push(city);
            localStorage.setItem(armazenamento_das_cidades, JSON.stringify(cities));
            exibirMensagem('Cidade adicionada com sucesso!', 'success');
        } else {
            exibirMensagem('Esta cidade já está na lista', 'error');
        }
        
        cityInput.value = '';
    } catch (error) {
        exibirMensagem('Cidade não encontrada', 'error');
    }
});

// funcao para exibir mensagem de erro ou sucesso
function exibirMensagem(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
}