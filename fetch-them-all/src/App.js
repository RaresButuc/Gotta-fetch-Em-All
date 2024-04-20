import "./App.css";
import React, { useState, useEffect } from "react";
import Locations from "./components/Locations";
import PokeData from "./components/PokeData";
import MyPokemons from "./components/MyPokemons";
import MyPokemonStats from "./components/MyPokemonStats";
import BackToLocations from "./components/BackToLocations";

const usersPokemon = [
  "https://pokeapi.co/api/v2/pokemon/bulbasaur",
  "https://pokeapi.co/api/v2/pokemon/charizard",
  "https://pokeapi.co/api/v2/pokemon/poliwhirl",
];

function App() {
  //Show Locations
  let [locations, setLocations] = useState([]);

  //On page or Not
  const [onPage, setOnPage] = useState(false);

  //Selected Location FLink
  const [selectedLocationFirstLink, setSelectedLocationFirstLink] =
    useState(null);

  //Selected Location SLink
  const [selectedLocationSecondLink, setSelectedLocationSecondLink] =
    useState(null);

  //Encountered Pokemon Name
  const [randomPokemonName, setRandomPokemonName] = useState(".");

  //Accesing Main Link
  const [mainLink, setMainLink] = useState(null);

  //Encountered Pokemon Stats
  const [encounteredPokemonStats, setEncounteredPokemonStats] = useState(null);

  //My Pokemon Informations: Name and Photo
  const [ownedPokemonData, setOwnedPokemonData] = useState(null);

  //Chosen Pokemon
  const [statsChosenPokemon, setStatsChosenPokemon] = useState(null);

  //Finished Game
  const [finished, setFinished] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch("https://pokeapi.co/api/v2/location");
        const locations = await info.json();
        setLocations(locations.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleBack = () => {
    setOnPage(false);
    setSelectedLocationFirstLink(null);
    setSelectedLocationSecondLink(null);
    setRandomPokemonName(".");
    setStatsChosenPokemon(null);
  };

  //Showing Pokemon Details

  function handleLocationDetails(location) {
    setOnPage(true);
    //First URL
    const linkLocation = location.url;
    setSelectedLocationFirstLink(linkLocation);
  }

  //Accesing the first URL
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(selectedLocationFirstLink);
        const firstLink = await info.json();
        let randomArea = Math.floor(Math.random() * firstLink.areas.length);
        setSelectedLocationSecondLink(firstLink.areas[randomArea].url);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedLocationFirstLink]);

  //Accesing the second URL and getting Pokemon name and first URL link to Image
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(selectedLocationSecondLink);
        const secondLink = await info.json();
        let randomName = Math.floor(
          Math.random() * secondLink.pokemon_encounters.length
        );
        setRandomPokemonName(
          secondLink.pokemon_encounters[randomName].pokemon.name
        );
        setMainLink(secondLink.pokemon_encounters[randomName].pokemon.url);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedLocationSecondLink]);

  //Encountered Pokemon Stats
  useEffect(() => {
    async function fetchData() {
      try {
        const info = await fetch(mainLink);
        const mainLinkPokemon = await info.json();
        const stats = {
          photo: mainLinkPokemon.sprites.other.dream_world.front_default,
          hp: mainLinkPokemon.stats[0].base_stat,
          attack: mainLinkPokemon.stats[1].base_stat,
          defense: mainLinkPokemon.stats[2].base_stat,
        };
        setEncounteredPokemonStats(stats);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [mainLink]);

  //Getting the names and photos of my pokemons
  // useEffect(() => {
    const getPokeInfo = async () => {
      const myPokemonInfos = [];
      for (const pokeApi of usersPokemon) {
        const info = await fetch(pokeApi);
        const data = await info.json();
        myPokemonInfos.push({
          name: data.forms[0].name,
          photoSmall: data.sprites.front_default,
          photoBig: data.sprites.other.dream_world.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
        });
      }
      setOwnedPokemonData(myPokemonInfos);
    };
    getPokeInfo();
  // }, []);

  //Choosing my Pokemon
  const choosingMyPokemon = (event) => {
    const chosen = ownedPokemonData.filter(
      (pokemon) => pokemon.name === event.target.value
    );
    setStatsChosenPokemon(chosen[0]);
  };

  //Fighting
  const damage = (attacker, defender) => {
    //Attacker
    const B = attacker.attack;
    //Defender
    const D = defender.defense;
    //Random Number and Damage
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
    const damage = ((((2 / 5 + 2) * B * 60) / D / 50 + 2) * Z) / 255;

    console.log(damage);
    return Math.floor(damage);
  };

  const properFight = () => {
    setFinished(true);
    let attackerHp = statsChosenPokemon.hp;
    let defenderHp = encounteredPokemonStats.hp;

    do {
      console.log(
        (defenderHp =
          defenderHp - damage(statsChosenPokemon, encounteredPokemonStats))
      );
      console.log(
        (attackerHp =
          attackerHp - damage(encounteredPokemonStats, statsChosenPokemon))
      );
    } while (attackerHp > 0 && defenderHp > 0);
    if (attackerHp <= 0) {
      console.log("Defender Won!");
      let encounteredPokemon =
        randomPokemonName.charAt(0).toUpperCase() + randomPokemonName.slice(1);
      setRandomPokemonName(`You Lost! ${encounteredPokemon} beat you!`);
      setStatsChosenPokemon(null);
    } else if (defenderHp <= 0) {
      console.log("Attacker Won!");
      usersPokemon.push(
        "https://pokeapi.co/api/v2/pokemon/" + randomPokemonName
      );
      console.log(usersPokemon);
      let wonPokemon = randomPokemonName;
      setRandomPokemonName(
        `Congratulations! You won a new Pokemon in your collection: 
        ${wonPokemon.charAt(0).toUpperCase() + wonPokemon.slice(1)}!`
      );
      setStatsChosenPokemon(null);
    }
  };

  return (
    <div className="App">
      {onPage ? (
        <div>
          {ownedPokemonData.map((pokemon) => (
            <MyPokemons
              name={pokemon.name}
              photo={pokemon.photoSmall}
              onUse={choosingMyPokemon}
            />
          ))}

          {encounteredPokemonStats && (
            <>
              <PokeData
                name={
                  randomPokemonName.length > 1
                    ? randomPokemonName
                    : "This location doesn't seem to have any pokémon"
                }
                photo={encounteredPokemonStats.photo}
                hp={encounteredPokemonStats.hp}
                attack={encounteredPokemonStats.attack}
                defense={encounteredPokemonStats.defense}
              />
              <BackToLocations getBack={handleBack} />
            </>
          )}

          {statsChosenPokemon && (
            <MyPokemonStats
              name={
                statsChosenPokemon.name.charAt(0).toUpperCase() +
                statsChosenPokemon.name.slice(1)
              }
              photo={statsChosenPokemon.photoBig}
              hp={statsChosenPokemon.hp}
              attack={statsChosenPokemon.attack}
              defense={statsChosenPokemon.defense}
              fightAction={properFight}
            />
          )}
        </div>
      ) : (
        <Locations
          locationsNames={locations}
          showInfos={handleLocationDetails}
        />
      )}
    </div>
  );
}

export default App;