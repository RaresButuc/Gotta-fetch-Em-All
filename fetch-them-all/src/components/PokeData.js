import React from "react";

const PokeData = ({ name, photo, hp, attack, defense, onBack }) => {
  return (
    <div className="pokemons">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src={photo} alt="" />
      <h4>HP: {hp}</h4>
      <h4>Attack: {attack}</h4>
      <h4>Defense: {defense}</h4><br></br>
    </div>
  );
};

export default PokeData;