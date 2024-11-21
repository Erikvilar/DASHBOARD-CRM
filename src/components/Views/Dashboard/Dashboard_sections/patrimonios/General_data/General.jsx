import {
  useCallback,
  useEffect,
  useState,
  Box,
  DataGrid,
  axios,
  toast,
  useNavigate,
  Dialogs,
  useMediaQuery,
  Button,
  GeneralFormModal,
  axiosGeneralRequest,
} from "./index.js";

export default function General() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(null);
  const [data, setData] = useState([]);
  const [promiseArguments, setPromiseArguments] = useState(null);

  const [openModalForm, setOpenModalForm] = useState(null);
  const handleOpenModalForm = () => setOpenModalForm(true);
  const handleCloseModalForm = () => setOpenModalForm(false);

  let token = sessionStorage.getItem("JWT");

  useEffect(() => {
    const requestGet = async () => {
      try {
        const response = await axiosGeneralRequest.get(token);
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
    const interval = setInterval(() => {
      requestGet();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const processRowUpdate = useCallback((newRow, oldRow) => {
    return new Promise((resolve, reject) => {
      if (newRow !== oldRow) {
        setOpenDialog(true);
        setPromiseArguments({ resolve, reject, newRow, oldRow });

        // Se houve mudança, salva os argumentos para resolver ou rejeitar a promessa
      } else {
        // Se não houve mudança, resolve com a linha original
        setOpenDialog(false);
        resolve(oldRow);
      }
    });
  }, []);

  const handleNo = () => {
    setOpenDialog(false);
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow);
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    setOpenDialog(false);
    const { newRow, resolve } = promiseArguments;
    await resolve(newRow);

    try {
      const data = {
        itemsDTO: {
          id_item: newRow.id_item,
          nf_invoice_item: newRow.nf_invoice_item,
          codigo_item: newRow.codigo_item,
          observacao_item: newRow.observacao_item,
          caminho_imagem_item: newRow.caminho_imagem_item,
          pedido_origem: newRow.pedido_origem,
          sde_item: newRow.sde_item,
          status_item: newRow.status_item,
          valor_item: newRow.valor_item,
          lastModify: sessionStorage.getItem("user"),
          updateIn: newRow.updateIn,
        },
        usersDTO: {
          id_usuario: newRow.id_usuario,
          nome_usuario: newRow.nome_usuario,
          tipo_usuario: newRow.tipo_usuario,
        },
        descriptionsDTO: {
          id_descricao: newRow.id_descricao,
          marca_descricao: newRow.marca_descricao,
          descricao_item: newRow.descricao_item,
          localizacao_descricao: newRow.localizacao_descricao,
          modelo_descricao: newRow.modelo_descricao,
          serie_descricao: newRow.serie_descricao,
        },
        costCenterDTO: {
          id_centro_custo: newRow.id_centro_custo,
          nome_centro_custo: newRow.nome_centro_custo,
          identificacao_centro_custo: newRow.identificacao_centro_custo,
          data_inicio_centro_custo: newRow.data_inicio_centro_custo,
          data_fim_centro_custo: newRow.data_fim_centro_custo,
        },
        contactsDTO: {
          id_contato: newRow.id_contato,
          email_contato: newRow.email_contato,
          ocupacao_contato: newRow.ocupacao_contato,
          telefone_contato: newRow.telefone_contato,
        },
      };

      const urlPath = "http://10.2.128.20:8021/general/update";
      const response = await axios.put(urlPath, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        toast.success("Dados atualizados");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectRow = async (event) => {
    const { key } = event;
    if (key === "Enter") console.log("enter pressionado");
    console.log("nada capturado");
  };
  const isLargeScreen = useMediaQuery("(min-width:1540px)");
  return (
    <Box
      sx={{
        height: isLargeScreen ? "90vh" : "80vh",
        width: isLargeScreen ? 1780 : 1000,
        maxWidth: "90%",
      }}
      component={"section"}
    >
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
      {openModalForm && (
        <GeneralFormModal
          open={openModalForm}
          close={handleCloseModalForm}
          handleClose={handleCloseModalForm}
        />
      )}

      <DataGrid
        style={{ width: "100%", height: "100%" }}
        getRowId={(row) => row.id_usuario}
        onCellEditStart={(value) => console.log(value.value)}
        onRowSelectionModelChange={(value) => console.log(value)}
        onCellEditStop={() => openDialog && setOpenDialog(true)}
        onKeyDown={handleSelectRow}
        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow)}
        columns={[
          {
            field: "id_item",
            headerName: "Line",
            width: 90,
            editable: false,
          },

          {
            field: "codigo_item",
            headerName: "Código",
            width: 150,
            editable: true,
          },

          {
            field: "descricao_item",
            headerName: "Descrição",
            width: 180,
            editable: true,
          },
          {
            field: "nome_usuario",
            headerName: "Responsavel",
            width: 150,
            editable: true,
          },
          {
            field: "tipo_usuario",
            headerName: "Ocupação",
            width: 250,
            editable: true,
          },
          //tb_items

          {
            field: "nf_invoice_item",
            headerName: "NF/INVOICE",
            width: 100,
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
            field: "marca_descricao",
            headerName: "Marca",
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
          {
            field: "lastModify",
            headerName: "Atualizado por",
            width: 120,
            editable: true,
          },
          {
            field: "updateIn",
            headerName: "Atualizado em",
            width: 180,
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
      <Button
        variant="text"
        style={{
          width: 60,
          borderRadius: 360,
          height: 60,
          backgroundColor: "#40A2E3",
          position: "relative",
          left: "90%",
          top: -150,
          cursor: "pointer",
          border: "none",
          fontSize: 25,
          color: "white",
        }}
        onClick={handleOpenModalForm}
      >
        +
      </Button>
    </Box>
  );
}
