const pokemonName = document.querySelector('.PokemonName');
const pokemonNumber = document.querySelector('.PokemonNumber');
const pokemonImage = document.querySelector('.PokemonImage');

const form = document.querySelector('.FormSearch');
const input = document.querySelector('.InputSearch');
const buttonPrev = document.querySelector('.BtnPrev');
const buttonNext = document.querySelector('.BtnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )

    if (ApiResponse.status === 200) {
        return ApiResponse.json();
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data
            ['sprites']
            ['versions']
            ['generation-v']
            ['black-white']
            ['animated']
            ['front_default'];

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const pokemon = input.value.toLowerCase();
    return renderPokemon(pokemon);
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        return renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    return renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon).then(result => {
    console.log("Pokemon rendered successfully:", result);
}).catch(error => {
    console.error("Error rendering Pokemon:", error);
});