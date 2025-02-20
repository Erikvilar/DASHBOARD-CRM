import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import axiosGeneralRequest from "../../../services/ApiServiceRequests";
import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import { Button, Input } from "@mui/material";

import axios from "axios";
export default function GeneralFormModal({ open, close, handleClose }) {
  const [isValid, setIsValid] = useState("is-valid");
  const [isSubmited, setIsSubmited] = useState(false);
  const [data, setData] = useState({
    itemsDTO: {
      nf_invoice_item: "",
      codigo_item: "",
      observacao_item: "",
      caminho_imagem_item: "",
      pedido_origem: "",
      processoSEI: "",
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
    const { name, value, type, files, image } = e.target;
    const [dto, field] = name.split(".");
    if (files.type != "application/pdf") {
      alert("dados invalido");
      return;
    }
    if (files.type != "image/jpeg") {
      alert("este dado nao e um imagem valida");
      return;
    }
    setData((prevData) => ({
      ...prevData,
      [dto]: {...prevData[dto],[field]: type === "file" ? files[0] : value,
      },
    }));
  };

  const [responsible, setResponsible] = useState([]);
  const token = sessionStorage.getItem("JWT");
  const requestGet = async () => {
    const response = await axios.get(
      "http://10.2.128.20:6680/general/responsible",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      setResponsible(Object.values(response.data));
    }
  };

  useEffect(() => {
    requestGet();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const dataCreate = {
        itemsDTO: {
          nf_invoice_item: data.itemsDTO.nf_invoice_item,
          codigo_item: data.itemsDTO.codigo_item,
          observacao_item: data.itemsDTO.observacao_item,
          caminho_imagem_item: data.itemsDTO.caminho_imagem_item,
          pedido_origem: data.itemsDTO.pedido_origem,
          sde_item: data.itemsDTO.sde_item,
          status_item:
            data.itemsDTO.status_item == "" ? "bom" : data.itemsDTO.status_item,
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
          identificacao_centro_custo:
            data.costCenterDTO.identificacao_centro_custo,
          data_inicio_centro_custo: data.costCenterDTO.data_inicio_centro_custo,
          data_fim_centro_custo: data.costCenterDTO.data_fim_centro_custo,
        },
        contactsDTO: {
          email_contato: data.contactsDTO.email_contato,
          ocupacao_contato: data.contactsDTO.ocupacao_contato,
          responsavel_geral: data.contactsDTO.responsavel_geral,
          telefone_contato: data.contactsDTO.telefone_contato,
        },
        receivingDTO: {
          termo: data.termo,
          lotação: data.lotação,
          fornecedor: data.fornecedor,
          email_fornecedor: data.email_fornecedor,
          termoPDF: data.termoPDF,
          pedidoPDF: data.pedidoPDF,
          empSIAFI: data.empSIAFI,
        },
      };

      const response = await axiosGeneralRequest.post(
        dataCreate,
        sessionStorage.getItem("JWT")
      );
      if (response.status == 200) {
        setIsSubmited(true);
        console.log("ok");
      }
    } catch {}
  };

  return (
    <Paper sx={{ width: "95%", padding: 5, backgroundColor: "#F7F7F7" }}>
      <Form onSubmit={handleCreate}>
        <div
          style={{
            width: "100%",
            height: 80,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <img
            src="src\images\Logo\sm_icon_dataflux3.png"
            width={50}
            height={50}
            alt="Logo da página"
          />
          <h3
            style={{
              margin: 10,
              color: "#1976d2",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Página de cadastro
          </h3>
        </div>

        {/* Recebimento */}
        <fieldset>
          <legend>
            <h5
              style={{
                margin: 5,
                color: "#1976d2",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Recebimento
            </h5>
          </legend>
          <Row>
            {/* Termo */}
            <Form.Group className="mb-3" as={Col} controlId="termo">
              <Form.Label style={{ fontWeight: "bold" }}>Termo</Form.Label>
              <Form.Control
                placeholder="123456..."
                name="receivingDTO.termo"
                type="number"
                maxLength={8}
                required
                className={isValid}
                value={data.receivingDTO.termo}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Lotação */}
            <Form.Group className="mb-3" as={Col} controlId="lotacao">
              <Form.Label style={{ fontWeight: "bold" }}>Lotação</Form.Label>
              <Form.Control
                name="receivingDTO.lotação"
                value={data.receivingDTO.lotação}
                onChange={handleChange}
                type="number"
                required
                className={isValid}
                placeholder="123456.."
              />
            </Form.Group>

            {/* Local Termo */}
            <Form.Group className="mb-3" as={Col} controlId="local">
              <Form.Label style={{ fontWeight: "bold" }}>
                Local termo
              </Form.Label>
              <Form.Control
                value={data.receivingDTO.local}
                name="receivingDTO.local"
                className={isValid}
                onChange={handleChange}
                type="text"
                placeholder="example"
              />
            </Form.Group>

            {/* EMP-SIAFI */}
            <Form.Group className="mb-3" as={Col} controlId="empsiafi">
              <Form.Label style={{ fontWeight: "bold" }}>EMP-SIAFI</Form.Label>
              <Form.Control
                type="number"
                className={isValid}
                name="receivingDTO.empSIAFI"
                value={data.receivingDTO.empSIAFI}
                onChange={handleChange}
                placeholder="example"
              />
            </Form.Group>
          </Row>
        </fieldset>

        {/* Usuário Responsável */}
        <fieldset>
          <legend>
            <h5
              style={{
                margin: 5,
                color: "#1976d2",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Usuário responsável
            </h5>
          </legend>
          <Row>
            {/* Nome do Usuário */}
            <Form.Group className="mb-3" as={Col} controlId="nome_usuario">
              <Form.Label style={{ fontWeight: "bold" }}>Nome</Form.Label>
              <Form.Control
                placeholder="nome do usuario"
                className={isValid}
                name="usersDTO.nome_usuario"
                value={data.usersDTO.nome_usuario}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Tipo de Usuário */}
            <Form.Group className="mb-3" as={Col} controlId="tipo">
              <Form.Label style={{ fontWeight: "bold" }}>Tipo</Form.Label>
              <Form.Control
                placeholder="Aluno ou engenheiro"
                className={isValid}
                value={data.usersDTO.tipo_usuario}
                name="usersDTO.tipo_usuario"
                onChange={handleChange}
              />
            </Form.Group>

            {/* Telefone de Contato */}
            <Form.Group className="mb-3" as={Col} controlId="telefone_contato">
              <Form.Label style={{ fontWeight: "bold" }}>Telefone</Form.Label>
              <Form.Control
                className={isValid}
                name="contactsDTO.telefone_contato"
                value={data.contactsDTO.telefone_contato}
                onChange={handleChange}
                placeholder="(00)0000-0000"
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" as={Col} controlId="email">
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Form.Control
                className={isValid}
                type="email"
                name="contactsDTO.email_contato"
                value={data.contactsDTO.email_contato}
                onChange={handleChange}
                placeholder="email@email.com"
              />
            </Form.Group>
          </Row>
        </fieldset>

        {/* Registro de Itens */}
        <fieldset>
          <legend>
            <h5
              style={{
                margin: 5,
                color: "#1976d2",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Registro de items
            </h5>
          </legend>
          <Row
            style={{
              borderWidth: 1,
              borderColor: "black",
              height: 120,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {/* Número Patrimônio */}
            <Form.Group className="mb-3" as={Col} controlId="patrimonio">
              <Form.Label style={{ fontWeight: "bold" }}>
                Número patrimônio
              </Form.Label>
              <Form.Control
                name="itemsDTO.codigo_item"
                className={isValid}
                value={isSubmited ? null : data.itemsDTO.codigo_item}
                onChange={handleChange}
                placeholder="000000000"
              />
            </Form.Group>

            {/* Descrição */}
            <Form.Group className="mb-3" as={Col} controlId="descricao">
              <Form.Label style={{ fontWeight: "bold" }}>Descrição</Form.Label>
              <Form.Control
                name="detailsDTO.descricao_item"
                onChange={handleChange}
                value={isSubmited ? null : data.detailsDTO.descricao_item}
                className={isValid}
                placeholder="example"
              />
            </Form.Group>

            {/* Marca */}
            <Form.Group className="mb-3" as={Col} controlId="marca">
              <Form.Label style={{ fontWeight: "bold" }}>Marca</Form.Label>
              <Form.Control
                name="detailsDTO.marca_descricao"
                value={isSubmited ? null : data.detailsDTO.marca_descricao}
                className={isValid}
                onChange={handleChange}
                placeholder="example"
              />
            </Form.Group>

            {/* Modelo */}
            <Form.Group className="mb-3" as={Col} controlId="modelo">
              <Form.Label style={{ fontWeight: "bold" }}>Modelo</Form.Label>
              <Form.Control
                name="detailsDTO.modelo_descricao"
                value={isSubmited ? null : data.detailsDTO.modelo_descricao}
                className={isValid}
                onChange={handleChange}
                placeholder="example"
              />
            </Form.Group>

            {/* Serial */}
            <Form.Group className="mb-3" as={Col} controlId="serial">
              <Form.Label style={{ fontWeight: "bold" }}>Serial</Form.Label>
              <Form.Control
                name="detailsDTO.serie_descricao"
                value={isSubmited ? null : data.detailsDTO.serie_descricao}
                className={isValid}
                onChange={handleChange}
                placeholder="example"
              />
            </Form.Group>

            {/* Localização */}
            <Form.Group className="mb-3" as={Col} controlId="localizacao">
              <Form.Label style={{ fontWeight: "bold" }}>
                Localização
              </Form.Label>
              <Form.Control
                value={
                  isSubmited ? null : data.detailsDTO.localizacao_descricao
                }
                name="detailsDTO.localizacao_descricao"
                onChange={handleChange}
                className={isValid}
                placeholder="sala ..."
              />
            </Form.Group>

            {/* Valor Unitário */}
            <Form.Group className="mb-3" as={Col} controlId="valor">
              <Form.Label style={{ fontWeight: "bold" }}>
                Valor unitário
              </Form.Label>
              <Form.Control
                className={isValid}
                type="number"
                onChange={handleChange}
                name="itemsDTO.valor_item"
                value={isSubmited ? null : data.itemsDTO.valor_item}
                placeholder="example"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" as={Col} controlId="sde">
              <Form.Label style={{ fontWeight: "bold" }}>SDE</Form.Label>
              <Form.Control
                name="itemsDTO.sde_item"
                value={isSubmited ? null : data.itemsDTO.sde_item}
                onChange={handleChange}
                className={isValid}
                placeholder="example"
              />
            </Form.Group>

            {/* Número do Pedido */}
            <Form.Group className="mb-3" as={Col} controlId="pedido">
              <Form.Label style={{ fontWeight: "bold" }}>
                Número do pedido
              </Form.Label>
              <Form.Control
                name="itemsDTO.pedido_origem"
                type="number"
                onChange={handleChange}
                value={isSubmited ? null : data.itemsDTO.pedido_origem}
                className={isValid}
                placeholder="example"
              />
            </Form.Group>

            {/* Processo SEI */}
            <Form.Group className="mb-3" as={Col} controlId="sei">
              <Form.Label style={{ fontWeight: "bold" }}>
                Processo SEI
              </Form.Label>
              <Form.Control
                className={isValid}
                onChange={handleChange}
                name="itemsDTO.processoSEI"
                value={data.itemsDTO.processoSEI}
                placeholder="example"
              />
            </Form.Group>

            {/* Nº NF/Invoice */}
            <Form.Group className="mb-3" as={Col} controlId="nf">
              <Form.Label style={{ fontWeight: "bold" }}>
                Nº NF/invoice
              </Form.Label>
              <Form.Control
                onChange={handleChange}
                type="number"
                name="itemsDTO.nf_invoice_item"
                value={isSubmited ? null : data.itemsDTO.nf_invoice_item}
                className={isValid}
                placeholder="example"
              />
            </Form.Group>

            {/* Foto/Imagem */}
            <Form.Group className="mb-3" as={Col} controlId="image">
              <Form.Label style={{ fontWeight: "bold" }}>Imagem</Form.Label>
              <Form.Control
                className={isValid}
                onChange={handleChange}
                type="file"
                accept="image/png, image/jpeg"
                name="itemsDTO.caminho_imagem_item"
                value={isSubmited ? null : data.itemsDTO.caminho_imagem_item}
                placeholder="Link da imagem"
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3" as={Col} controlId="image">
              <Form.Label style={{ fontWeight: "bold" }}>Pedido PDF</Form.Label>
              <Form.Control
                className={isValid}
                onChange={handleChange}
                type="file"
                accept="application/pdf"
                name="itemsDTO.caminho_imagem_item"
                value={isSubmited ? null : data.itemsDTO.caminho_imagem_item}
                placeholder="Link da imagem"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} controlId="image">
              <Form.Label style={{ fontWeight: "bold" }}>Termo PDF</Form.Label>
              <Form.Control
                className={isValid}
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                name="itemsDTO.caminho_imagem_item"
                value={isSubmited ? null : data.itemsDTO.caminho_imagem_item}
                placeholder="Link da imagem"
              />
            </Form.Group>
          </Row>
        </fieldset>

        {/* Centro de Custo */}
        <fieldset>
          <legend>
            <h5
              style={{
                margin: 5,
                color: "#1976d2",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Centro de custo
            </h5>
          </legend>
          <Row>
            {/* Nome do Projeto */}
            <Form.Group className="mb-3" as={Col} controlId="nome_projeto">
              <Form.Label style={{ fontWeight: "bold" }}>
                Nome do projeto
              </Form.Label>
              <Form.Control placeholder="example" />
            </Form.Group>

            {/* Identificação */}
            <Form.Group className="mb-3" as={Col} controlId="identificacao">
              <Form.Label style={{ fontWeight: "bold" }}>
                Identificação
              </Form.Label>
              <Form.Control placeholder="example" />
            </Form.Group>

            {/* Data de Início do Projeto */}
            <Form.Group className="mb-3" as={Col} controlId="data_inicio">
              <Form.Label style={{ fontWeight: "bold" }}>
                Data de início do projeto
              </Form.Label>
              <Form.Control type="date" placeholder="example" />
            </Form.Group>

            {/* Data de Fim do Projeto */}
            <Form.Group className="mb-3" as={Col} controlId="data_fim">
              <Form.Label style={{ fontWeight: "bold" }}>
                Data fim do projeto
              </Form.Label>
              <Form.Control type="date" placeholder="example" />
            </Form.Group>
          </Row>
        </fieldset>

        {/* Botões de Ação */}
        <div>
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
    </Paper>
  );
}
