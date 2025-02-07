import { pdf } from "@react-pdf/renderer";
import {
  useCallback,
  useEffect,
  useState,
  Box,
  DataGrid,
  toast,
  useNavigate,
  Dialogs,
  useMediaQuery,
  Button,
  GeneralFormModal,
  axiosGeneralRequest,
  FaImages,
  format,
  DocumentToPrint,
  PrintIcon,
  Link,
} from "./index.js";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  initializeWebSocket,
  sendWebSocketMessage,
} from "../../../../../../services/ConnectionWebsocket.js";

import eventEmitter from "../../../../../../services/events/Emitter.js";
import { FaRegFilePdf } from "react-icons/fa";
import { subHours } from "date-fns";
import { MdAttachMoney } from "react-icons/md";



export default function General() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(null);
  const [data, setData] = useState();
  const [promiseArguments, setPromiseArguments] = useState(null);
  const [openModalForm, setOpenModalForm] = useState(null);
  const handleCloseModalForm = () => setOpenModalForm(false);
  const [line, setLine] = useState();
  const [message, setMessage] = useState(null);
  const handleLine = (value) => setLine(value);
  const [affectedLines, setAffectedLines] = useState({old:"", new:""})
const role = sessionStorage.getItem("role");
const controlEdit =()=>{
  return role == "USER" ? false:true;
}

  const columns = [
    {
      field: "id_item",
      headerName: "ID",
      align: "center",
      headerAlign: "center",
      width: 50,
      editable: false,
    },
    {
      field: "imprimir",
      headerName: "imprimir",
      align: "center",
      headerAlign: "center",
      width: 100,
      renderCell: (param) => {
        return (
          <Button onClick={() => handlePrint(param.row)}>
            <PrintIcon />
          </Button>
        );
      },
      editable: false,
    },

    {
      field: "codigo_item",
      headerName: "Código",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: controlEdit(),
    },

    {
      field: "descricao_item",
      headerName: "Descrição",
      align: "center",
      headerAlign: "center",
      width: 180,
      editable: controlEdit(),
    },
    {
      field: "nome_usuario",
      headerName: "Responsavel",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: controlEdit(),
    },
    {
      field: "tipo_usuario",
      headerName: "Ocupação",
      align: "center",
      headerAlign: "center",
      width: 250,
      editable: controlEdit(),
    },
    //tb_items

    {
      field: "nf_invoice_item",
      headerName: "NF/INVOICE",
      align: "center",
      headerAlign: "center",
      width: 100,
      editable: controlEdit(),
    },

    {
      field: "observacao_item",
      headerName: "Observação",
      align: "center",
      headerAlign: "center",
      width: 300,
    
      editable: controlEdit(),
    },
    {
      field: "caminho_imagem_item",
      headerName: "Imagem",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: controlEdit(),
      renderCell: (params) => {
        return (
          <Button disabled={params.value == "" ? true : false}>
            <Link
              target="_blank"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
              to={params.value}
            >
              {params.value ? (
                <img
                  src={params.value}
                  alt=""
                  width={"50%"}
                  style={{ borderRadius: 10 }}
                />
              ) : (
                <FaImages color="gray" size={35} />
              )}
            </Link>{" "}
          </Button>
        );
      },
    },

    {
      field: "status_item",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      width: 180,
      type: 'singleSelect',
      valueOptions: ['ESTADO REGULAR', 'ESTADO RUIM', 'ESTADO EM ANALISE', 'MANUTENÇÃO'],

      renderCell:(params)=>{

        switch (params.value) {
          case 'ESTADO REGULAR':
              return <span>{params.value} ✅</span>

          case 'ESTADO RUIM':
            return <span>{params.value} ⚠️</span>
           
          case 'ESTADO EM ANALISE':
            return <span>{params.value} 🔍</span>
         
          case 'MANUTENÇÃO':
            return <span>{params.value} 🛠</span>

          default:
            break;
        }
       
    
      },
      editable: controlEdit(),
     
    },
    {
      field: "valor_item",
      headerName: "Valor",
      align: "center",
      type: "number",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <span>
            <MdAttachMoney color="green" size={20} /> {params.value}
          </span>
        );
      },
      editable: controlEdit(),
    },

    {
      field: "marca_descricao",
      headerName: "Marca",
      align: "center",
      headerAlign: "center",
      width: 120,
      editable: controlEdit(),
    },

    {
      field: "localizacao_descricao",
      headerName: "Local",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "termo",
      headerName: "Termo",
      type: "number",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },

    {
      field: "lotação",
      headerName: "Lotação",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "fornecedor",
      headerName: "fornecedor",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "sde_item",
      headerName: "SDE",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "termoPDF",
      headerName: "Termo PDF",
      align: "center",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => {
        return (
          <Button disabled={params.value == "" ? true : false}>
            <Link
              target="_blank"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
                margin: "auto",
              }}
              to={params.value}
            >
              <FaRegFilePdf
                size={28}
                color={params.value == "" ? "gray" : "darkred"}
              />
            </Link>{" "}
          </Button>
        );
      },
          editable: controlEdit(),
    },
    {
      field: "pedidoPDF",
      headerName: "Pedido PDF",
      align: "center",
      headerAlign: "center",
      width: 120,
      renderCell: (params) => {
        return (
          <Button disabled={params.value == "" ? true : false}>
            <Link
              target="_blank"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
              to={params.value}
            >
              <img
                src="https://fau.org.br/wp-content/uploads/2023/05/Logo-nova-middle.png"
                alt=""
                width={50}
              />
            </Link>{" "}
          </Button>
        );
      },
          editable: controlEdit(),
    },
    {
      field: "empSIAFI",
      headerName: "empSIAFI",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },

    {
      field: "serie_descricao",
      headerName: "Serie",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },

    {
      field: "nome_centro_custo",
      headerName: "Nome Projeto",
      align: "center",
      headerAlign: "center",
      width: 120,

          editable: controlEdit(),
    },
    {
      field: "identificacao_centro_custo",
      headerName: "SIGLA",
      align: "center",
      headerAlign: "center",

      width: 120,
          editable: controlEdit(),
    },
    {
      field: "data_inicio_centro_custo",
      headerName: "Inicio",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "data_fim_centro_custo",
      headerName: "Fim",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "modelo_descricao",
      headerName: "Modelo",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "email_contato",
      headerName: "Email",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "ocupacao_contato",

      headerName: "Contato ocupacional",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "responsavel_geral",
      headerName: "Responsavel Geral",
      align: "center",
      headerAlign: "center",
      width: 150,
          editable: controlEdit(),
    },
    {
      field: "telefone_contato",
      headerName: "Telefone",
      align: "center",
      headerAlign: "center",
      width: 120,
          editable: controlEdit(),
    },
    {
      field: "lastModify",
      headerName: "Alteração",
      align: "center",
      headerAlign: "center",
      width: 80,
      editable: true,
    },
    {
      field: "updateIn",
      headerName: "Alteração",
      editable: true,
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        const date = new Date(params.value);
        const dateInGMT3 = subHours(date, 3);
        const formattedDate = format(dateInGMT3, "dd-MM-yyyy HH:mm");
        return <span>{formattedDate}</span>;
      },
    },
  ];




  const [columnsVisibility, setColumnsVisibility] = useState(() => {
    const savedColumns = localStorage.getItem("ColumnsVisibility");
    return savedColumns
      ? JSON.parse(savedColumns)
      : Object.fromEntries(columns.map((col) => [col.field, true]));
  });

  let token = sessionStorage.getItem("JWT");

  const requestGet = async () => {
    try {
      const response = await axiosGeneralRequest.get(token);
      if (response.status === 200) {
        console.log("Dados iniciais carregados com sucesso.");
        setData(response.data);
        console.log(typeof response.data);
      }
    } catch (e) {
      console.error("Erro ao buscar os dados iniciais:", e);
      toast.error("Identificado acesso não autorizado.");
      setTimeout(() => navigate("/"), 5500);
    }
  };

  useEffect(() => {
    requestGet();
  }, []);



  const processRowUpdate = useCallback((newRow, oldRow) => {
    return new Promise((resolve, reject) => {

      if (newRow !== oldRow) {
        
        setOpenDialog(true);
        setPromiseArguments({ resolve, reject, newRow, oldRow });
      } else {
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

  const handleMessage = (newMessage) => {
    const convertedData = {
      ...newMessage.body.contactsDTO,
      ...newMessage.body.costCenterDTO,
      ...newMessage.body.detailsDTO,
      ...newMessage.body.usersDTO,
      ...newMessage.body.itemsDTO,
      ...newMessage.body.receivingDTO,
    };

    const updatedItem = {
      id_usuario: newMessage.body.usersDTO.id_usuario,
      ...convertedData,
    };
    setData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id_usuario === updatedItem.id_usuario ? updatedItem : item
      );

      return updatedData;
    });
  };

  useEffect(() => {
    initializeWebSocket(token);
  }, []);

  useEffect(() => {
    eventEmitter.on("messageReceived", handleMessage);
  }, [message]);

  const handleYes = async () => {
    setOpenDialog(false);
    const { newRow, resolve } = promiseArguments;
    console.log({...newRow})
    await resolve(newRow);

    try {
      const dateGMT3 = new Date();
      const dataUpdate = {
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
          updateIn: dateGMT3,
        },
        usersDTO: {
          id_usuario: newRow.id_usuario,
          nome_usuario: newRow.nome_usuario,
          tipo_usuario: newRow.tipo_usuario,
        },
        detailsDTO: {
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
          responsavel_geral: newRow.responsavel_geral,
          telefone_contato: newRow.telefone_contato,
        },
        receivingDTO: {
          id_recebimento: newRow.id_recebimento,
          termo: newRow.termo,
          lotação: newRow.lotação,
          fornecedor: newRow.fornecedor,
          termoPDF: newRow.termoPDF,
          pedidoPDF: newRow.pedidoPDF,
          empSIAFI: newRow.empSIAFI,
        },
      };

      const response = await axiosGeneralRequest.put(dataUpdate, token);
      if (response.status == 200) {
        sendWebSocketMessage("/app/join", dataUpdate);
        toast.success("Dados atualizados");
      } else {
        console.log("ocorrreu um erro" + response.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectRow = async (params, event) => {
    if (event.key === "Delete") {
      try {
        const response = await axiosGeneralRequest.delete(
          line,
          sessionStorage.getItem("JWT")
        );
        if (response.status == 200) {
          alert("item deletado " + line);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [loading, setLoading] = useState(false);

  const handlePrint = async (row) => {
    try {
      setLoading(true);
      const print = {
        image: row.caminho_imagem_item ? row.caminho_imagem_item : "",
        descricao: row.descricao_item,
        valor: row.valor_item,
        status: row.status_item,
        SDE: row.sde_item,
        local: row.localizacao_descricao,
        responsavel: row.nome_usuario,
        ocupacao: row.tipo_usuario,
        modelo: row.modelo_descricao,
        serial: row.serie_descricao,
        termo: row.termo,
      };

      const blob = await pdf(<DocumentToPrint data={print} />).toBlob();
      const url = URL.createObjectURL(blob);

      setTimeout(() => window.open(url, "_blank"), 1500);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isLargeScreen = useMediaQuery("(min-width:1540px)");

  useEffect(() => {
    localStorage.setItem(
      "ColumnsVisibility",
      JSON.stringify(columnsVisibility)
    );
  }, [columnsVisibility]);

  
  return (
    <Box
      sx={{
        height: isLargeScreen ? "80vh" : "80vh",
        width: isLargeScreen ? 1780 : 1000,
        maxWidth: "90%",
      }}
      component={"section"}
    >
      {openDialog && (
        <Dialogs
          open={openDialog}
          close={handleNo}
          newValue={affectedLines.new}
          oldValue={affectedLines.old}
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
        onRowSelectionModelChange={handleLine}
        columnVisibilityModel={columnsVisibility}
        onCellEditStart={(params)=> setAffectedLines({old:params.formattedValue})}
     
        onColumnVisibilityModelChange={(newModel) =>
          setColumnsVisibility(newModel)
        }
        onCellEditStop={(params) => setAffectedLines({new:params.formattedValue}) }
        
        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow)}
        localeText={{
          toolbarColumns: "Definir Colunas",
          toolbarDensity: "Densidade",
          toolbarFilters: "Filtrar",
        }}
        slots={{
          toolbar: () => (
            <div style={{ padding: 0 }}>
              <GridToolbarQuickFilter
                style={{ padding: 10, width: 500 }}
                placeholder="Buscar items"
              />
              <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarFilterButton />
                <GridToolbarExport />
              </GridToolbarContainer>
            </div>
          ),
        }}
        columns={columns}
        rows={data}
      
        pageSizeOptions={[1]}
      />

 
    </Box>
  );
}
