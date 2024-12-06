import { Box, Button, Modal } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import axiosGeneralRequest from "../../services/ApiServiceRequests";
import { Col, Form, Row } from "react-bootstrap";
import module from "./GeneralFormModal.module.css"
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
    const dataCreate = {
      itemsDTO: {
        nf_invoice_item: data.itemsDTO.nfInvoice,
        codigo_item: data.itemsDTO.codigo_item,
        observacao_item: data.itemsDTO.observacao_item,
        caminho_imagem_item: data.itemsDTO.caminho_imagem_item,
        pedido_origem: data.pedido_origem,
        sde_item: data.sde_item,
        status_item: data.status_item,
        valor_item: data.valor_item,
        lastModify: sessionStorage.getItem("user"),
        updateIn: data.updateIn,
      },
      usersDTO: {
        nome_usuario: data.nome_usuario,
        tipo_usuario: data.tipo_usuario,
      },
      detailsDTO: {
        id_descricao: data.id_descricao,
        marca_descricao: data.marca_descricao,
        descricao_item: data.descricao_item,
        localizacao_descricao: data.localizacao_descricao,
        modelo_descricao: data.modelo_descricao,
        serie_descricao: data.serie_descricao,
      },
      costCenterDTO: {
        id_centro_custo: data.id_centro_custo,
        nome_centro_custo: data.nome_centro_custo,
        identificacao_centro_custo: data.identificacao_centro_custo,
        data_inicio_centro_custo: data.data_inicio_centro_custo,
        data_fim_centro_custo: data.data_fim_centro_custo,
      },
      contactsDTO: {
        id_contato: data.id_contato,
        email_contato: data.email_contato,
        ocupacao_contato: data.ocupacao_contato,
        telefone_contatos: data.telefone_contato,
      },
    };
    try {
      const response = await axiosGeneralRequest.post(
        dataCreate,
        sessionStorage.getItem("JWT")
      );
      if (response.status == 200) {
        console.log("ok");
      }
    } catch {}
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height:"100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    bgcolor: "background.paper",
    border: "2px solid #DEAA79",
    boxShadow: 24,

    p: 5,
  };

  return (
    <Modal
      open={open}
      onClose={close}
  
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box >
          <img
            src="src\images\Logo\DATAFLUX.png"
            alt=""
            width={200}
            style={{ position: "fixed", top: -60, left: 0, padding: 5, }}
          />
        </Box>

        <Form style={{ width: "100%" ,margin:"auto", overflowY:"scroll", scrollbarWidth:"none"}}>
          <Row style={{ width: 120, padding: 10, margin: "auto" }}>
            <img
              width={20}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ufu_logo.svg/2048px-Ufu_logo.svg.png"
              alt="logo"
            />
          </Row>
          <Row>
            <h4>Termo de responsabilidade - Secretaria</h4>
          </Row>
         
          <Row className="mb-2">
          <Form.Label style={{textAlign:"start", fontWeight:700}}>Dados do recebimento</Form.Label>
            <Form.Group as={Col} controlId="formGridTermo">
              <Form.Label>Termo</Form.Label>
              <Form.Control type="number" placeholder="Termo" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Lotação</Form.Label>
              <Form.Control type="email" placeholder="Lotação" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Local</Form.Label>
              <Form.Control type="email" placeholder="Localização" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Emp SIAFI</Form.Label>
              <Form.Control type="email" placeholder="EMP SIAFI" />
            </Form.Group>
          </Row>
          <Row className="mb-5">
          <Form.Label style={{textAlign:"start", fontWeight:700}}>Dados do centro de custo</Form.Label>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Nome centro de custo</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Sigla</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Inicio do projeto</Form.Label>
              <Form.Control type="date"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Fim do projeto</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

     
          </Row>
          <Row className={module.forms}>
      
          <Form.Label style={{textAlign:"start", fontWeight:700}}>Dados dos items</Form.Label>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Patrimonio</Form.Label>
              <Form.Control placeholder="Número patrimonio" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Codigo de barras</Form.Label>
              <Form.Control placeholder="Código de barras" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Sufixo</Form.Label>
              <Form.Control placeholder="Sufixo" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Conta</Form.Label>
              <Form.Control placeholder="Conta" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Pedido</Form.Label>
              <Form.Control placeholder="Pedido" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Processo SEI</Form.Label>
              <Form.Control placeholder="Número SEI" />
            </Form.Group>
          <Row>
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Label>Especificação</Form.Label>
            <Form.Control placeholder="Especificação detalhada" />
          </Form.Group>
          </Row>
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Serie Fabrica</Form.Label>
              <Form.Control placeholder="Serie" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Valor unitario</Form.Label>
              <Form.Control placeholder="R$ valor " />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Co-Responsavel</Form.Label>
              <Form.Control placeholder="Coordenação responsável" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Solicitante</Form.Label>
              <Form.Control placeholder="Solicitante ou demandante" />
            </Form.Group>
          </Row>
          
        
       
      

          <Row>
          <Form.Label style={{textAlign:"start", fontWeight:700}}>Dados do processo</Form.Label>
            <Form.Group as={Col} lassName="mb-3" controlId="formGridEmpresa">
              <Form.Label>Empresa</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridEmpresa">
              <Form.Label>Processo</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
            <Form.Group as={Col} lassName="mb-3" controlId="formGridEmpresa">
              <Form.Label>Tipo</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridEmpresa">
              <Form.Label>Nota Fiscal</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
            <Form.Group as={Col} lassName="mb-3" controlId="formGridEmpresa">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridEmpresa">
              <Form.Label>Garantia</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGridEmpresa">
              <Form.Label>Assinatura Recepção</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
          </Row>

      

      
        </Form>

        <div className={module.boxButtons}>
          <Button
            variant="text"
            onClick={handleClose}
            style={{ backgroundColor: "orange", color:"white" }}
          >
            Cancelar
          </Button>
          <Button
            variant="text"
            onClick={handleCreate}
            style={{ backgroundColor: "yellowgreen",color:"white" }}
          >
            Salvar
          </Button>
        </div>

        <ToastContainer position="bottom-left" />
      </Box>
    </Modal>
  );
}
