import { pdf, render } from "@react-pdf/renderer";
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
  format,
  DocumentToPrint,
  GiMagnifyingGlass,
  GrStatusGood,
  GoAlert,
  BsTools,
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
import { FcOpenedFolder, FcPrint } from "react-icons/fc";

import eventEmitter from "../../../../../../services/events/Emitter.js";
import { FaRegFilePdf } from "react-icons/fa";
import { subHours } from "date-fns";
import { MdAttachMoney, MdFolderOff } from "react-icons/md";
import { Bounce } from "react-activity";
import { MenuItem, Select } from "@mui/material";

export default function General() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(null);
  const [data, setData] = useState();
  const [promiseArguments, setPromiseArguments] = useState(null);
  const [openModalForm, setOpenModalForm] = useState(null);
  const handleCloseModalForm = () => setOpenModalForm(false);
  const [line, setLine] = useState();
  const message = useState(null);
  const handleLine = (value) => setLine(value);
  const [affectedLines, setAffectedLines] = useState({ old: "", new: "" });
  const role = sessionStorage.getItem("role");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [columnResponsibles, setColumnResponsibles] = useState([]);
  let token = sessionStorage.getItem("JWT");
  const controlEdit = () => {
    return role != "USER";
  };
  useEffect(() => {
    const request = async () => {
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
    request();
  }, []);

  useEffect(() => {
    const request = async () => {
      const response = await axiosGeneralRequest.responsibles(token);
      if (response.status === 200) {
        setColumnResponsibles(Object.values(response.data));
        console.log("retorno"+columnResponsibles)
      }
    };
    request();
  }, []);

  const columns = [
    // ID ITEM
    {
      field: "id_item",
      headerName: "ID",
      align: "center",
      headerAlign: "center",
      width: 50,
      renderHeader: () => (
        <span style={{ color: "#08C2FF", fontWeight: 800 }}>ID</span>
      ),
      renderCell: (params) => (
        <span style={{ fontWeight: 800 }}>{params.value}</span>
      ),
      editable: false,
    },
    //IMPRIMIR
    {
      field: "imprimir",
      headerName: "imprimir",
      align: "left",
      headerAlign: "center",
      width: 80,
      renderHeader: () => (
        <span style={{ color: "#08C2FF", fontWeight: 800 }}>
          <FcPrint size={20} />
        </span>
      ),
      renderCell: (param) => {
        return (
          <Button onClick={() => handlePrint(param.row)}>
            <FcPrint size={20} />
          </Button>
        );
      },
      editable: false,
    },
    //CODIGO DO ITEM
    {
      field: "codigo_item",
      headerName: "Nº PATRIMONIO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>Nº PATRIMONIO</span>
      ),
      width: 150,
      editable: controlEdit(),
    },
    //DESCRIÇÃO DO ITEM
    {
      field: "descricao_item",
      headerName: "DESCRIÇÃO DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          DESCRIÇÃO DO ITEM
        </span>
      ),
      width: 250,
      editable: controlEdit(),
    },
    //NOME DO USUARIO
    {
      field: "nome_usuario",
      headerName: "RESPONSÁVEL IMEDIATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          RESPONSÁVEL IMEDIATO
        </span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //TIPO DE USUARIO
    {
      field: "tipo_usuario",
      headerName: "OCUPAÇÃO DO IMEDIATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          OCUPAÇÃO DO IMEDIATO
        </span>
      ),
      width: 250,
      editable: controlEdit(),
    },
    //NF E INVOICE
    {
      field: "nf_invoice_item",
      headerName: "Nº NF/INVOICE/NF-e",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          Nº NF/INVOICE/NF-e
        </span>
      ),
      width: 250,
      editable: controlEdit(),
    },
    //CAMINHO DA IMAGEM
    {
      field: "caminho_imagem_item",
      headerName: "IMAGENS DO ITEM",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          IMAGENS DO ITEM
        </span>
      ),
      editable: controlEdit(),
      renderCell: (params) => {
        return params.value !== "" ? (
          <Link to={params.value} target="_blank">
            <FcOpenedFolder size={35} />
          </Link>
        ) : (
          <MdFolderOff color="gray" size={35} />
        );
      },
    },
    //STATUS DO ITEM
    {
      field: "status_item",
      headerName: "SITUAÇÃO DO ITEM",
      align: "center",
      headerAlign: "center",
      width: 200,
      type: "singleSelect",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          SITUAÇÃO DO ITEM
        </span>
      ),
      valueOptions: [
        "Estado regular",
        "Estado ruim",
        "Em análise",
        "Em manutenção",
      ],

      renderCell: (params) => {
        switch (params.value) {
          case "Estado regular":
            return (
              <span>
                {" "}
                <GrStatusGood color="green" size={18} /> {params.value}
              </span>
            );

          case "Estado ruim":
            return (
              <span>
                {" "}
                <GoAlert color="black" size={18} /> {params.value}
              </span>
            );

          case "Em análise":
            return (
              <span>
                {" "}
                <GiMagnifyingGlass color="blue" size={18} /> {params.value}
              </span>
            );

          case "Em manutenção":
            return (
              <span>
                {" "}
                <BsTools size={18} color="brown" /> {params.value}
              </span>
            );

          default:
            break;
        }
      },
      editable: controlEdit(),
    },
    //VALOR DO ITEM
    {
      field: "valor_item",
      headerName: "VALOR DO ITEM",
      align: "center",
      type: "number",
      headerAlign: "center",

      width: 200,
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>VALOR DO ITEM</span>
      ),
      renderCell: (params) => {
        return (
          <span>
            <MdAttachMoney color="green" size={20} /> {params.value}
          </span>
        );
      },
      editable: controlEdit(),
    },
    //MARCA DO ITEM
    {
      field: "marca_descricao",
      headerName: "MARCA DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>MARCA DO ITEM</span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //SERIE DESCRIÇÃO
    {
      field: "serie_descricao",
      headerName: "SERIAL",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>SERIAL</span>
      ),
      width: 120,
      editable: controlEdit(),
    },
    //MODELO DE DESCRIÇÃO
    {
      field: "modelo_descricao",
      headerName: "MODELO DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>
          MODELO DO ITEM
        </span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //OBSERVAÇÕES DO ITEM
    {
      field: "observacao_item",
      headerName: "OBSERVÇÕES",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FA812F", fontWeight: 800 }}>OBSERVÇÕES</span>
      ),
      width: 300,

      editable: controlEdit(),
    },
    //TEMRO
    {
      field: "termo",
      headerName: "Nº TERMO",
      type: "number",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#C14600", fontWeight: 800 }}>Nº TERMO</span>
      ),
      width: 120,
      editable: controlEdit(),
    },
    //LOCALIZAÇÃO DO ITEM
    {
      field: "localizacao_descricao",
      headerName: "LOCALIZAÇÃO DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#C14600", fontWeight: 800 }}>
          LOCALIZAÇÃO DO ITEM
        </span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //LOTAÇÃO
    {
      field: "lotação",
      headerName: "LOTAÇÃO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#C14600", fontWeight: 800 }}>LOTAÇÃO</span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //FORNECEDOR
    {
      field: "fornecedor",
      headerName: "NOME FORNECEDOR",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#C14600", fontWeight: 800 }}>
          NOME FORNECEDOR
        </span>
      ),
      width: 280,
      editable: controlEdit(),
    },
    //EMAIL FORNECEDOR
    {
      field: "email_fornecedor",
      headerName: "EMAIL FORNECEDOR",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#C14600", fontWeight: 800 }}>
          EMAIL FORNECEDOR
        </span>
      ),
      width: 280,
      editable: controlEdit(),
    },
    //SDE ITEM
    {
      field: "sde_item",
      headerName: "Nº SDE",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#C14600", fontWeight: 800 }}>Nº SDE</span>
      ),
      width: 120,
      editable: controlEdit(),
    },
    //TERMO PDF
    {
      field: "termoPDF",
      headerName: "DOCUMENTO TERMO",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderHeader: () => (
        <span style={{ color: "#FF8383", fontWeight: 800 }}>
          DOCUMENTO TERMO
        </span>
      ),
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
    //PEDIDO PDF
    {
      field: "pedidoPDF",
      headerName: "DOCUMENTO PEDIDO",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderHeader: () => (
        <span style={{ color: "#FF8383", fontWeight: 800 }}>
          DOCUMENTO PEDIDO
        </span>
      ),
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
    //EMPSIAFI
    {
      field: "empSIAFI",
      headerName: "EMPSIAFI",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#FF8383", fontWeight: 800 }}>EMPSIAFI</span>
      ),
      width: 120,
      editable: controlEdit(),
    },
    //NOME CENTRO DE CUSTO
    {
      field: "nome_centro_custo",
      headerName: "NOME DO PROJETO",
      align: "center",
      renderHeader: () => (
        <span style={{ color: "#A0C878", fontWeight: 800 }}>
          NOME DO PROJETO
        </span>
      ),
      headerAlign: "center",
      width: 200,

      editable: controlEdit(),
    },
    //IDENTIFICAÇÃO DO PROJETO
    {
      field: "identificacao_centro_custo",
      headerName: "IDENTIFICAÇÃO DO PROJETO",
      align: "center",
      renderHeader: () => (
        <span style={{ color: "#A0C878", fontWeight: 800 }}>
          IDENTIFICAÇÃO DO PROJETO
        </span>
      ),
      headerAlign: "center",

      width: 200,
      editable: controlEdit(),
    },
    //DATA DE INICIO
    {
      field: "data_inicio_centro_custo",
      headerName: "DATA INÍCIO PROJETO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#A0C878", fontWeight: 800 }}>
          DATA INÍCIO PROJETO
        </span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //DATA FIM 
    {
      field: "data_fim_centro_custo",
      headerName: "DATA FIM PROJETO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#A0C878", fontWeight: 800 }}>
          DATA FIM PROJETO
        </span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //RESPONSAVEL GERAL
    {
      field: "responsavel_geral",
      headerName: "RESPONSÁVEL GERAL",
      align: "center",
      headerAlign: "center",
      width: 200,
      type: 'singleSelect',
      valueOptions: columnResponsibles.map(responsible => responsible.name),
      renderHeader: () => (
        <span style={{ color: "#2973B2", fontWeight: 800 }}>
          RESPONSÁVEL GERAL
        </span>
      ),
      editable: controlEdit(),
    },
    //EMAIL CONTATO
    {
      field: "email_contato",
      headerName: "EMAIL RESPONSÁVEL GERAL",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#2973B2", fontWeight: 800 }}>
          EMAIL RESPONSÁVEL GERAL
        </span>
      ),
      width: 250,
      editable: controlEdit(),
    },
    //OCUPAÇÃO CONTATO
    {
      field: "ocupacao_contato",

      headerName: "OCUPAÇÃO",
      align: "center",
      headerAlign: "center",

      renderHeader: () => (
        <span style={{ color: "#2973B2", fontWeight: 800 }}>OCUPAÇÃO</span>
      ),
      width: 120,
      editable: controlEdit(),
    },
    //TELEFONE CONTATO
    {
      field: "telefone_contato",
      headerName: "TELEFONE PARA CONTATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "#2973B2", fontWeight: 800 }}>
          TELEFONE PARA CONTATO
        </span>
      ),
      width: 200,
      editable: controlEdit(),
    },
    //PESSOA QUEM REGISTROU ULTIMA MODIFICAÇÃO <-- CAMPO IMPORTANTE
    {
      field: "lastModify",
      headerName: "ALTERADO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span style={{ color: "blue", fontWeight: 800 }}>ALTERADO</span>
      ),
      renderCell: (params) => (
        <p style={{ textTransform: "uppercase" }}>{params.value}</p>
      ),
      width: 180,
      editable: false,
    },
    //UPDATE DATE
    {
      field: "updateIn",
      headerName: "ATUALIZADO",
      editable: false,
      headerAlign: "center",

      width: 200,
      renderHeader: () => (
        <span style={{ color: "blue", fontWeight: 800 }}>ATUALIZADO</span>
      ),
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
    console.log({ ...newRow });
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
          email_fornecedor:newRow.email_fornecedor != null ? newRow.email_fornecedor : "vazio",
          termoPDF: newRow.termoPDF != null ? newRow.termoPDF : "vazio",
          pedidoPDF: newRow.pedidoPDF != null ? newRow.pedidoPDF : "vazio",
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "ArrowRight") {
        setPage((prev) => prev + 1);
      } else if (event.ctrlKey && event.key === "ArrowLeft" && page > 0) {
        setPage((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page]);

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
        onCellEditStart={(params) =>
          setAffectedLines({ old: params.formattedValue })
        }
        onColumnVisibilityModelChange={(newModel) =>
          setColumnsVisibility(newModel)
        }
        onCellEditStop={(params) =>
          setAffectedLines({ new: params.formattedValue })
        }
        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow)}
        localeText={{
          toolbarColumns: "Definir Colunas",
          toolbarDensity: "Densidade",
          toolbarFilters: "Filtrar",
          noRowsLabel: (
            <div>
              {" "}
              Carregando dados{" "}
              <Bounce color="#727981" size={12} speed={1} animating={true} />
            </div>
          ),
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
        pagination
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => setPage(model.page)}
        pageSizeOptions={[1]}
        sx={{
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#4C585B !important", // Cor de fundo ao selecionar
            color: "white", // Cor do texto ao selecionar
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "#7E99A3 !important", // Cor ao passar o mouse na linha selecionada
            cursor: "pointer",
          },
        }}
      />
    </Box>
  );
}
