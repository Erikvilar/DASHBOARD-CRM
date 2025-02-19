


import { Box, Button } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";



const CadResponsaveis =()=>{


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
      <div >
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
       
      </Box>
      <Box>
        <select name="" id="">
  
        </select>
      </Box>
      </>

     
      )
}
export default CadResponsaveis;