import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { PageContainer } from "@toolpad/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Dialogs from "../../../../modals/Dialogs";
import { useMediaQuery } from "@mui/material";

export default function General() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmEdition, setConfirmEdition] = useState(true);
  const [data, setData] = useState([]);
  const [promiseArguments, setPromiseArguments] = useState(null);

  useEffect(() => {
    const requestGet = async () => {
      const token = sessionStorage.getItem("JWT");
      console.log(token);
      try {
        const urlPath = "http://192.168.100.5:8021/general/";
        const response = await axios.get(urlPath, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          console.log("registro OK");

          setData(response.data);
        }
      } catch (e) {
        toast.error("Identificado acesso não autorizado");
        setTimeout(() => navigate("/"), 5500);
      }
    };
    requestGet();
  }, []);

  const processRowUpdate = useCallback((newRow, oldRow) => {
    return new Promise((resolve, reject) => {
      if (newRow !== oldRow) {
        setPromiseArguments({ resolve, reject, newRow, oldRow });

        // Se houve mudança, salva os argumentos para resolver ou rejeitar a promessa
      } else {
        // Se não houve mudança, resolve com a linha original
        resolve(oldRow);
      }
    });
  }, []);
  const handleNo = () => {
    setOpenDialog(false);
    setConfirmEdition(false);
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };
  const handleYes = async () => {
    setOpenDialog(false);
    setConfirmEdition(true);
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    resolve(newRow);
    console.log(newRow.id_usuario);
    try {
      const urlPath = "http://192.168.100.5:8021/general/save";
      const response = await axios.put(urlPath, newRow);
      if (response.status == 200) {
        alert("dados atualizados");
      }
    } catch (e) {
      alert("ocorreu um erro " + e);
    }
  };
  const isLargeScreen = useMediaQuery("(min-width:1540px)");
  return (

    
    
      <Box sx={{
        height: isLargeScreen ? "90vh" : "80vh", // 90vh para telas grandes, 80vh para outras
        width: isLargeScreen ? "100%" : "85%", // largura diferente conforme o tamanho da tela
        maxWidth: 1400,   
        }}component={"section"}>
        {openDialog && (
          <Dialogs
            open={openDialog}
            close={handleNo}
            newValue={""}
            oldValue={""}
            handleY={handleYes}
            handleN={handleNo}
          />
        )}
        <DataGrid
          style={{ width: "100%", height: "100%" }}
          getRowId={(row) => row.id_usuario}
          onCellEditStart={(value) => console.log(value.value)}
          onCellClick={(value) => console.log(value)}
          onCellEditStop={() => setOpenDialog(true)}
          processRowUpdate={(newRow, oldRow) =>
            processRowUpdate(newRow, oldRow)
          }
          columns={[
            {
              field: "id_usuario",
              headerName: "ID Usuário",
              width: 90,
              editable: false,
            },
            {
              field: "nome_usuario",
              headerName: "Patrimônio",
              width: 150,
              editable: true,
            },
            {
              field: "tipo_usuario",
              headerName: "Ocupação",
              width: 250,
              editable: true,
            },
            {
              field: "id_item",
              headerName: "ID Item",
              width: 180,
              editable: false,
            },
            { field: "nf_invoice_item", headerName: "NF/INVOICE", width: 100 },
            {
              field: "codigo_item",
              headerName: "Código",
              width: 150,
              editable: true,
            },
            {
              field: "observacao_item",
              headerName: "Observação",
              width: 150,
              editable: true,
            },
            {
              field: "caminho_imagem_item",
              headerName: "Imagem",
              width: 150,
              editable: true,
            },
            {
              field: "sde_item",
              headerName: "SDE",
              width: 120,
              editable: true,
            },
            {
              field: "status_item",
              headerName: "Status",
              width: 120,
              editable: true,
            },
            {
              field: "valor_item",
              headerName: "Valor",
              width: 120,
              editable: true,
            },
            {
              field: "id_descricao",
              headerName: "ID descrição",
              width: 120,
              editable: false,
            },
            {
              field: "marca_descricao",
              headerName: "Marca",
              width: 120,
              editable: true,
            },
            {
              field: "descricao_item",
              headerName: "Descrição",
              width: 120,
              editable: true,
            },
            {
              field: "localizacao_descricao",
              headerName: "Local",
              width: 120,
              editable: true,
            },
            {
              field: "serie_descricao",
              headerName: "Serie",
              width: 120,
              editable: true,
            },
            {
              field: "id_centro_custo",
              headerName: "ID Projeto",
              width: 120,
              editable: true,
            },
            {
              field: "nome_centro_custo",
              headerName: "Nome Projeto",
              width: 120,
              editable: true,
            },
            {
              field: "identificacao_centro_custo",
              headerName: "SIGLA",
              width: 120,
              editable: true,
            },
            {
              field: "data_inicio_centro_custo",
              headerName: "Inicio",
              width: 120,
              editable: true,
            },
            {
              field: "data_fim_centro_custo",
              headerName: "Fim",
              width: 120,
              editable: true,
            },
            {
              field: "modelo_descricao",
              headerName: "Modelo",
              width: 120,
              editable: true,
            },
            {
              field: "email_contato",
              headerName: "Email",
              width: 120,
              editable: true,
            },
            {
              field: "ocupacao_contato",
              headerName: "Contato ocupacional",
              width: 120,
              editable: true,
            },
            {
              field: "telefone_contato",
              headerName: "Telefone",
              width: 120,
              editable: true,
            },
          ]}
          rows={data}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[1]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
   
  );
}
