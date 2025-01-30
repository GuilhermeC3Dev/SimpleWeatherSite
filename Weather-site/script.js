//chave da API openweather
const chave_API = 'c479768d43795c92da5c78ba021681b6';
//armazenamento das cidades
const armazenamento_das_cidades = 'cidades';
const clima_container = document.getElementById('clima-container');

// Funcao pra pegar dados do clima
async function obterClima(city) {
    //try catch caso nao seja possivel pegar os dados
    try {
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${chave_API}`
        );
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
    }
}

//cria os elementos com os dados do clima no HTML
function adicionarDadosNoHTML(dados_clima) {
    const card = document.createElement('div');
    card.className = 'weather-card';

    card.innerHTML = `
        <h3>${dados_clima.name}</h3>
        <img src="https://openweathermap.org/img/wn/${dados_clima.weather[0].icon}@2x.png" alt="${dados_clima.weather[0].description}">
        <div class=p-container>
            <p>${Math.round(dados_clima.main.temp)}°C</p>
            <p >Sensação: ${Math.round(dados_clima.main.feels_like)}°C</p>
            <p>Umidade: ${dados_clima.main.humidity}%</p>
        <div>
    `;

    return card;
}

//atualiza o HTML com a lista de cidades
async function atualizarDados() {
    clima_container.innerHTML = '';
    const cidades_list = JSON.parse(localStorage.getItem(armazenamento_das_cidades));    
    for (const cidade of cidades_list) {
        const dados_clima = await obterClima(cidade);
        if (dados_clima) {
            clima_container.appendChild(adicionarDadosNoHTML(dados_clima));
        }
    }
}

//funcao do botao limpar as cidades 
function limparCidades() {
    const button = document.getElementById('limpar-bttn');
    button.addEventListener('click', function() {
        localStorage.removeItem(armazenamento_das_cidades);
        atualizarDados();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    limparCidades();
});


document.addEventListener('DOMContentLoaded', atualizarDados);
