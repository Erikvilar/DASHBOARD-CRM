import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./style.css";
import Projetos from "./projetos";
import Responsaveis from "./responsaveis";
import { Box } from "@mui/material";
import ResponsavelGeral from "./ResponsavelGeral";

const CadastroGeral = ()=>{
  const [choice, setChoice] = useState(1);
  const handleChoice = (value)=>{
    setChoice(value);
    console.log(value)

  }
  const selectedPage =(value)=>{
    switch(value){
      case 1:
        return <Projetos/>
      case 2:
        return <ResponsavelGeral/>
      case 3:
        return <Responsaveis/>
      default:
        <Projetos/>
    }
  }

  const getItemStyle = (value) => {
    return {
      cursor: 'pointer',
      padding: '10px',
      backgroundColor: choice=== value ? '#007bff' : 'white', 
      color: choice === value ? 'white' : 'black', 
    };
  };
 return (
  <>
       <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginBottom: 10,
          }}
        >
          <h3
            style={{
              color: "white",
              width: "60%",
              padding: 20,
              textAlign: "left",
              paddingLeft: 20,
              paddingRight: 20,
              fontWeight: "bold",
            }}
          >
            Registros gerais
         
          </h3>
        </div>
  <div>
  
      <ul className="list-choice" >
          <li onClick={()=> handleChoice(1)} style={getItemStyle(1)}>Projetos</li>
          <li onClick={()=> handleChoice(2)} style={getItemStyle(2)}>Coordenador</li>
          <li onClick={()=> handleChoice(3)} style={getItemStyle(3)}>Imediatos</li>
      </ul>
  </div>
  <Box>{selectedPage(choice)}</Box>
  </>
 )
}
export default CadastroGeral;