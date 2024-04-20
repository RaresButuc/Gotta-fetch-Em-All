import React from "react";

const MyPokemonStats = ({ name, photo, hp, attack, defense,fightAction }) => {
  return (
    <div className="myPokemonStats">
      <button onClick = {fightAction}>Fight</button>
      <h2>{name}</h2>
      <img src={photo} alt="" /><br></br>
      <h4>HP: {hp}</h4>
      <h4>Attack: {attack}</h4>
      <h4>Defense: {defense}</h4>
    </div>
  );
};

export default MyPokemonStats;