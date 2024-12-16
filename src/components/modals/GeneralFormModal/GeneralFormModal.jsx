import { Box, Button, Modal } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import module from "./GeneralFormModal.module.css";
import axiosGeneralRequest from "../../../services/ApiServiceRequests";
import baseResponse from "./baseResponse";


export default function GeneralFormModal({ open, close, handleClose }) {
  const [data, setData] = useState({
    itemsDTO: {
      nf_invoice_item: "",
      codigo_item: "",
      observacao_item: "",
      caminho_imagem_item: "",
      pedido_origem: "",
      sde_item: "",
      status_item: "",
      valor_item: "",
    },
    usersDTO: {
      nome_usuario: "",
      tipo_usuario: "",
    },
    detailsDTO: {
      marca_descricao: "",
      descricao_item: "",
      localizacao_descricao: "",
      modelo_descricao: "",
      serie_descricao: "",
    },
    costCenterDTO: {
      nome_centro_custo: "",
      identificacao_centro_custo: "",
      data_inicio_centro_custo: null,
      data_fim_centro_custo: null,
    },
    contactsDTO: {
      email_contato: "",
      ocupacao_contato: "",
      telefone_contato: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(data.nfInvoice);

  const handleCreate = async () => {

      const responseData = baseResponse(data)
    try {
      const response = await axiosGeneralRequest.post(
        responseData,
        sessionStorage.getItem("JWT")
      );
      if (response.status == 200) {
        console.log("ok");
      }
    } catch {}
  };


  
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className={module.boxTest}>
        
          <Form className={module.boxWindow}>

      
   
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control  />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control  />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control  />
        </Form.Group>
      </Row>

 
          <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>
      <Row>
      <Form.Group className="mb-3" as={Col} controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" as={Col}  controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
  

      <Form.Group className="mb-3" as={Col}  controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Form.Group className="mb-3" as={Col}  controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Form.Group className="mb-3" as={Col}  controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>
  
   
      </Row>
      

          </Form>

          <div className={module.boxButtons}>
            <Button
              variant="text"
              onClick={handleClose}
              style={{ backgroundColor: "orange", color: "white" }}
            >
              Cancelar
            </Button>
            <Button
              variant="text"
              onClick={handleCreate}
              style={{ backgroundColor: "yellowgreen", color: "white" }}
            >
              Salvar
            </Button>
          </div>
        </div>

        <ToastContainer position="bottom-left" />
      </Box>
    </Modal>
  );
}
