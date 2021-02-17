let right_container = document.querySelector(".right-container")
let list_item = right_container.querySelectorAll(".list-item")
let prev_button = right_container.querySelector(".left-button")
let next_button = right_container.querySelector(".right-button")
let previous_url = null
let next_url = null
let pokemon;
let pokemonid;


let config = {
    method: "get",
    headers: {
        "Content-Type": "application/json"


    }
}
// Fetch data pour l'écran gauche
function generatePokedex(url) {
    fetch(url, config)
        .then(function (res) {
            res.json()
                .then(function (data) {
                    for (let i = 0; i < 20; i++) {
                        pokemon = data.results[i].name;
                        let pokemon_url = data.results[i].url;
                        getid(pokemon_url, pokemon, i)

                    }
                    previous_url = data.previous
                    next_url = data.next
                    show_pokemon()

                })
                .catch(function (error) {
                    console.log(error)
                   

                })


        })
        .catch(function (error) {
            console.log(error)
        })
}
function getid(pokemon_url, pokemon, i) {
    fetch(pokemon_url, config)
        .then(function (res) {
            res.json()
                .then(function (data) {
                    pokemonid = data.id
                    list_item[i].textContent = `${pokemonid}. ${pokemon} `

                })
                .catch(function (error) {
                    console.log(error)
                })
        })
        .catch(function (error) {
            console.log(error)

        })
}
function show_pokemon() {
    let header_desc = document.querySelector(".screen__header")
    list_item.forEach(function (e) {
        e.addEventListener("click", function () {
            let pokemon_info = e.textContent.split(".")
            let name = pokemon_info[1]
            let id = idShape(pokemon_info[0])
            header_desc.querySelector(".poke-name").textContent = name
            header_desc.querySelector(".poke-id").textContent = id
            document.querySelector(".main-screen").classList.remove("hide")
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_info[0]}`, config)
                .then(function (res) {
                    res.json()
                        .then(function (data) {
                            let weight = data.weight
                            let height = data.height
                            let type_a = data.types[0].type.name
                            let type_b;
                            if (data.types.length === 1) {
                                document.querySelector(".poke-type-two").classList.add("hide")
                            }
                            else {
                                type_b = data.types[1].type.name
                                if (document.querySelector(".poke-type-two").classList.contains("hide")) {
                                    document.querySelector(".poke-type-two").classList.remove("hide")
                                }

                            }
                             // Afficher les images de Pokemon front et back
                            let back_image = data.sprites.back_default
                            let front_image = data.sprites.front_default
                            document.querySelector(".poke-weight").textContent = weight
                            document.querySelector(".poke-height").textContent = height
                            document.querySelector(".poke-type-one").textContent = type_a
                            document.querySelector(".poke-type-two").textContent = type_b
                            document.querySelector(".main-screen").classList.add(`${type_a}`)
                            document.querySelector(".poke-back-image").src = back_image
                            document.querySelector(".poke-front-image").src = front_image




                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)

                })
        })


    })
}
function idShape(id) {
    let shape = "#000";
    let idStr = id.toString()
    let finalID = shape.slice(0, 4 - idStr.length) + id;
    return finalID;
}

// Prev et next Button
function previous() {
    if (previous_url) {
        generatePokedex(previous_url)
    }
}

function next() {
    if (next_url) {
        generatePokedex(next_url)
    }
}

generatePokedex("https://pokeapi.co/api/v2/pokemon/");
prev_button.addEventListener("click", previous)
next_button.addEventListener("click", next)

