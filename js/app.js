const search = document.querySelector('.search') //Barra de pesquisa
const btn = document.querySelector('.btn') //Botão de pesquisa
const err = document.querySelector('.err') //Mensagem de erro

// Variáveis inerentes aos atributos do Card
const boxPokemon = document.querySelector('.box-pokemon') // Card Pokemon

const imgPokemon = document.querySelector('.box-pokemon img') //Imagem do Pokemon
const nameOfPokemon = document.querySelector('.name') //Nome do Pokemon
const typePokemon = document.querySelector('.type') //Tipo do Pokemon
const abilityPokemon = document.querySelector('.abilities') //Habilidades do Pokemon
const weightPokemon = document.querySelector('.weight') //Peso do Pokemon
const heightPokemon = document.querySelector('.height') //Altura do Pokemon
const movesPokemon = document.querySelector('.moves')

btn.addEventListener('click', searchPokemon) //Evento ao clicar no botão
//Função que consome os dados da API
async function searchPokemon(e) {
  e.preventDefault()
  try {
    let namePokemon = search.value.toLowerCase()

    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}/?limit=350`)
    const dadosUrl = await url.json()
    console.log(dadosUrl)

    imgPokemon.src = dadosUrl.sprites.front_default
    nameOfPokemon.innerText = dadosUrl.name
    typePokemon.innerText = dadosUrl.types.map(item => ' ' + item.type.name).toString()
    abilityPokemon.innerText = dadosUrl.abilities.map(item => ' ' + item.ability.name)
    movesPokemon.innerText = dadosUrl.moves.map(moves => ' ' + moves.move.name).slice(0, 50)
    weightPokemon.innerText = dadosUrl.weight / 10 + ' kg'
    heightPokemon.innerText = dadosUrl.height / 10 + ' m'

    showBoxPokemon()
  }
  catch (erro) {
    search.value = ''
    hideBoxPokemon()
  }
}

//Função que exibe o card do Pokemon em caso de sucesso na busca
function showBoxPokemon() {
  search.value = ''
  boxPokemon.style.display = 'block'
  err.style.display = 'none'
}

//Função que oculta o card Pokemon em caso de erros na busca
function hideBoxPokemon() {
  boxPokemon.style.display = 'none'
  err.style.display = 'block'
}