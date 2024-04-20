import React from "react";

const MyPokemons = ({ name, photo, onUse }) => {
  return (
    <div className="myOwnPokemon">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src={photo} alt="" /><br></br>
      <input name = 'chooseIt' type = 'radio' value = {name} onClick = {onUse}></input>
      <div></div>
    </div>
  );
};

export default MyPokemons;