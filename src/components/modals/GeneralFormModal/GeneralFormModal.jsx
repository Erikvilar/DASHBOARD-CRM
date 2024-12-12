import { Box, Button, Modal } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import axiosGeneralRequest from "../../services/ApiServiceRequests";
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
      receivingDTO: {
        id_recebimento: null,
        local: null,
        lotação: null,
        empSIAFI: null,
        termo:null,
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

  

  return (
    <Modal
      open={open}
      onClose={close}
  
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

  
      <Box classname={module.boxTest}>
        <Box >
          <img
            src="src\images\Logo\DATAFLUX.png"
            alt=""
            width={200}
            style={{ position: "fixed", top: -60, left: 0, padding: 5, }}
          />
        </Box>
        <div className={module.boxTest}></div>



      

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
