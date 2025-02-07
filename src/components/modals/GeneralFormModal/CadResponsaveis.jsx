


import { Box, Button } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import module from "./GeneralFormModal.module.css";
import axios from "axios";
import { useEffect, useState } from "react";




const CadResponsaveis =()=>{
const [data, setData] = useState([]);
const token = sessionStorage.getItem("JWT")
 const requestGet = async () => {
      const response = await axios.get("http://10.2.128.20:6680/general/responsible",  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        
        setData(response.data);
      
      }
    }
  
  useEffect(()=>{
    requestGet();
  },[])
const listData = Object.values(data)

  return (
    <>
  <fieldset >
    <legend>
      <span>Cadastrar Responsavel</span>
    </legend>
    <Row>
      {/*termo */}
      <Form.Group className="mb-3" as={Col} controlId="termo">
        <Form.Label htmlFor="termo">Nome</Form.Label>
        <Form.Control
          placeholder="123456..."
          name="receivingDTO.termo"
    
          required
     
        />
      </Form.Group>

      {/*lotacao*/}
      <Form.Group className="mb-3 " as={Col} controlId="lotacao">
        <Form.Label htmlFor="lotacao">ocupação</Form.Label>
        <Form.Control
          name="receivingDTO.lotação"
      
       
   
          require
      
        />
      </Form.Group>

      {/*local termo */}
      <Form.Group className="mb-3 " as={Col} controlId="Local">
        <Form.Label htmlFor="local">CPF</Form.Label>
        <Form.Control
        
          name="receivingDTO.local"
   
        />
      </Form.Group>
      </Row>
      <div className={module.boxButtons}>
              <Button
                variant="text"
        
                style={{ backgroundColor: "orange", color: "white" }}
              >
                Cancelar
              </Button>
              <Button
                variant="text"
                type="submit"
                style={{ backgroundColor: "yellowgreen", color: "white" }}
              >
                Salvar
              </Button>
            </div>
           
      </fieldset >
      <Box sx={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
        <b style={{padding:20}}>Usuarios registrados</b>
        {listData.map((values)=>{
            return (
               
                <p style={{padding:10}}>
                   <b>Nome</b>:  {values.name}  --- <b>Occupação</b>: {values.occupation}
                </p>
            )
        })}
      </Box>
      <Box>
        <select name="" id="">
            {listData.map((values)=>(<option>{values.name}</option>))}
        </select>
      </Box>
      </>

     
      )
}
export default CadResponsaveis;