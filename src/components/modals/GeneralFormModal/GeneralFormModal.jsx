import { Box, Button, Modal } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import module from "./GeneralFormModal.module.css";
import axiosGeneralRequest from "../../../services/ApiServiceRequests";
import { useState } from "react";


export default function GeneralFormModal({ open, close, handleClose }) {
  const [isValid, setIsValid] = useState("is-valid")
  const [data, setData] = useState({
    itemsDTO: {
      nf_invoice_item: null,
      codigo_item: "",
      observacao_item: null,
      caminho_imagem_item: null,
      pedido_origem: null,
      sde_item: null,
      status_item: null,
      valor_item: null,
    },
    usersDTO: {
      nome_usuario: "",
      tipo_usuario: "",
    },
    detailsDTO: {
      marca_descricao: null,
      descricao_item: null,
      localizacao_descricao: null,
      modelo_descricao: null,
      serie_descricao: null,
    },
    costCenterDTO: {
      nome_centro_custo:"",
      identificacao_centro_custo: "",
      data_inicio_centro_custo: "",
      data_fim_centro_custo: "",
    },
    contactsDTO: {
      email_contato: "",
      responsavel_geral: "",
      ocupacao_contato: "",
      telefone_contato: "",
    },
    receivingDTO: {
      termo: "",
      lotação: "",
      local: "",
      empSIAFI: "",
    },
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    const [dto, field] = name.split('.');
    setData((prevData) => ({
      ...prevData,
      [dto]:{
        ...prevData[dto], //preserve state
        [field]: value,
      }

    }));
  
  };


  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const dataCreate = {
        itemsDTO: {
          nf_invoice_item: data.itemsDTO.nf_invoice_item,
          codigo_item: data.itemsDTO.codigo_item,
          observacao_item: data.itemsDTO.observacao_item,
          caminho_imagem_item: data.itemsDTO.caminho_imagem_item,
          pedido_origem:data.itemsDTO.pedido_origem,
          sde_item:data.itemsDTO.sde_item,
          status_item: data.itemsDTO.status_item,
          valor_item: data.itemsDTO.valor_item,
          lastModify: sessionStorage.getItem("user"),
          updateIn: data.itemsDTO.updateIn,
        },
        usersDTO: {
          nome_usuario: data.usersDTO.nome_usuario,
          tipo_usuario: data.usersDTO.tipo_usuario,
        },
        detailsDTO: {
          marca_descricao: data.detailsDTO.marca_descricao,
          descricao_item: data.detailsDTO.descricao_item,
          localizacao_descricao: data.detailsDTO.localizacao_descricao,
          modelo_descricao: data.detailsDTO.modelo_descricao,
          serie_descricao: data.detailsDTO.serie_descricao,
        },
        costCenterDTO: {
          nome_centro_custo: data.costCenterDTO.nome_centro_custo,
          identificacao_centro_custo:data.costCenterDTO.identificacao_centro_custo,
          data_inicio_centro_custo: data.costCenterDTO.data_inicio_centro_custo,
          data_fim_centro_custo: data.costCenterDTO.data_fim_centro_custo,
        },
        contactsDTO: {
          email_contato: data.contactsDTO.email_contato,
          ocupacao_contato: data.contactsDTO.ocupacao_contato,
          responsavel_geral:data.contactsDTO.responsavel_geral,
          telefone_contato:data.contactsDTO.telefone_contato,
        },
        receivingDTO: {
          termo: data.receivingDTO.termo,
          local: data.receivingDTO.local,
          lotação: data.receivingDTO.lotação,
          empSIAFI: data.receivingDTO.empSIAFI,
        },
      };

      const response = await axiosGeneralRequest.post(
        dataCreate,
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
          <Form className={module.boxWindow} onSubmit={handleCreate}>
            
            {/*recebimento*/}
            <fieldset className="p-3 ">
              <legend>
                <span>Recebimento</span>
              </legend>
              <Row>

                {/*termo */}
                <Form.Group className="mb-3" as={Col} controlId="termo">
                  <Form.Label htmlFor="termo">Termo</Form.Label>
                  <Form.Control
                    placeholder="123456..."
                    name="receivingDTO.termo"
                    type="number"
                    
                    className={isValid}
                    value={data.receivingDTO.termo}
                    onChange={handleChange}
                  />

                
                </Form.Group>

                {/*lotacao*/}
                <Form.Group className="mb-3 " as={Col} controlId="lotacao">
                  <Form.Label htmlFor="lotacao">Lotação</Form.Label>
                  <Form.Control 
                  name="receivingDTO.lotação"
                  value={data.receivingDTO.lotação}
                  onChange={handleChange}
                  type="number"
                  className={isValid}
                  placeholder="123456.." />
                </Form.Group>

                {/*local termo */}
                <Form.Group className="mb-3 "as={Col} controlId="Local"
                >
                  <Form.Label htmlFor="local">local termo</Form.Label>
                  <Form.Control 
                  value={data.receivingDTO.local}
                  name="receivingDTO.local"
                  className={isValid}
                  onChange={handleChange}
                  type="text" 
                  placeholder="example" />
                </Form.Group>


                {/*EMPSIAFI */}
                <Form.Group className="mb-3 " as={Col} controlId="empsiafi"
                >
                  <Form.Label htmlFor="empsiafi">EMP-SIAFI</Form.Label>
                  <Form.Control 
                  type="number"
                  className={isValid}
                  name="receivingDTO.empSIAFI"
                  value={data.receivingDTO.empSIAFI}
                  onChange={handleChange}
                  placeholder="example" />
                </Form.Group>


              </Row>
            </fieldset>

            {/* usuario */}
            <fieldset className="p-3 ">
              <legend>
                <span>Usuário responsavel</span>
              </legend>
              <Row>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="nome_usuario"
                >
                  <Form.Label htmlFor="nome_usuario">Nome</Form.Label>
                  <Form.Control 
                  placeholder="nome do usuario" 
                  className={isValid}
                  name="usersDTO.nome_usuario"
                  value={data.usersDTO.nome_usuario}
                  onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="tipo"
                >
                  <Form.Label htmlFor="tipo_usuario">Tipo</Form.Label>
                  <Form.Control 
                  placeholder="Aluno ou engenheiro" 
                  className={isValid}
                  value={data.usersDTO.tipo_usuario}
                  name="usersDTO.tipo_usuario"
                  onChange={handleChange}
                  
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="responsavel_geral"
                >
                  <Form.Label htmlFor="responsavel_geral">Coordenador responsavel</Form.Label>
                  <Form.Control
                    name="contactsDTO.responsavel_geral"
                    className={isValid}
                    value={data.contactsDTO.responsavel_geral}
                    onChange={handleChange}
                   placeholder="coordenador ou responsavel" />
               
                </Form.Group>

                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="telefone_contato"
                >
                  <Form.Label htmlFor="telefone_contato">Telefone</Form.Label>
                  <Form.Control 
                  className={isValid}
                  name="contactsDTO.telefone_contato"
                  value={data.contactsDTO.telefone_contato}
                  onChange={handleChange}
                  placeholder="(00)0000-0000"
                  
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="email"
                >
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control 
                  className={isValid}
                  type="email"
                  name="contactsDTO.email_contato"
                  value={data.contactsDTO.email_contato}
                  onChange={handleChange}
                  placeholder="email@email.com" />
                </Form.Group>
              </Row>
            </fieldset>

            {/* Items */}
            <fieldset className="p-3 ">
              <legend>
                <span>Registro de items</span>
              </legend>
              <Row>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="patrimonio"
                  name="itemsDTO.codigo_item"
                  value={data.itemsDTO.codigo_item}
                  onChange={handleChange}
                >
                  <Form.Label htmlFor="patrimonio">Número patrimonio</Form.Label>
                  <Form.Control placeholder="000000000" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Marca</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Serial</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Localização</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Row>
                  <Form.Group
                    className="mb-3 "
                    as={Col}
                    controlId="formGridAddress1"
                  >
                    <Form.Label>Valor unitário</Form.Label>
                    <Form.Control placeholder="example" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 "
                    as={Col}
                    controlId="formGridAddress1"
                  >
                    <Form.Label>SDE</Form.Label>
                    <Form.Control placeholder="example" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 "
                    as={Col}
                    controlId="formGridAddress1"
                  >
                    <Form.Label>Número do pedido</Form.Label>
                    <Form.Control placeholder="example" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 "
                    as={Col}
                    controlId="formGridAddress1"
                  >
                    <Form.Label>Processo SEI</Form.Label>
                    <Form.Control placeholder="example" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 "
                    as={Col}
                    controlId="formGridAddress1"
                  >
                    <Form.Label>Nº NF/invoice</Form.Label>
                    <Form.Control placeholder="example" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 "
                    as={Col}
                    controlId="formGridAddress1"
                  >
                    <Form.Label>Foto/Imagem</Form.Label>
                    <Form.Control type="link" placeholder="Link da imagem" />
                  </Form.Group>
                </Row>
              </Row>
            </fieldset>

            {/* Centro de custo*/}
            <fieldset className="p-3 ">
              <legend>
                <span>Centro de custo</span>
              </legend>
              <Row>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Nome do projeto</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Identificação</Form.Label>
                  <Form.Control placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Data de inicio do projeto</Form.Label>
                  <Form.Control type="date" placeholder="example" />
                </Form.Group>
                <Form.Group
                  className="mb-3 "
                  as={Col}
                  controlId="formGridAddress1"
                >
                  <Form.Label>Data fim do projeto</Form.Label>
                  <Form.Control type="date" placeholder="example" />
                </Form.Group>
              </Row>
            </fieldset>


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
                type="submit"
                style={{ backgroundColor: "yellowgreen", color: "white" }}
              >
                Salvar
              </Button>
            </div>
          </Form>
        </div>

        <ToastContainer position="bottom-left" />
      </Box>
    </Modal>
  );
}
