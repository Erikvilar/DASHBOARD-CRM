
import "./styles.css";
import {
  useCallback,
  useEffect,
  useState,
  Box,
  DataGrid,
  toast,
  useNavigate,
  Dialogs,
  Button,
  GeneralFormModal,
  axiosGeneralRequest,
  format,
  GiMagnifyingGlass,
  GrStatusGood,
  GoAlert,
  BsTools,
  Link,
} from "./index.js";
import { FcInfo, FcOk } from "react-icons/fc";

import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import {
  initializeWebSocket,
  sendWebSocketMessage,
} from "../../../../../../services/ConnectionWebsocket.js";

import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

import eventEmitter from "../../../../../../services/events/Emitter.js";
import { Bounce } from "react-activity";
import { Avatar, Chip } from "@mui/material";
import Swal from "sweetalert2";
import CountUp from "react-countup";
import { useRef } from "react";
export default function General() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(null);
  const [data, setData] = useState();
  const [promiseArguments, setPromiseArguments] = useState({
    newRow: () => { },
    resolve: () => { },
  });
  const [openModalForm, setOpenModalForm] = useState(null);
  const handleCloseModalForm = () => setOpenModalForm(false);
  const [line, setLine] = useState();
  const message = useState(null);
  const handleLine = (value) => setLine(value);
  const role = localStorage.getItem("role");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(11);
  const [responsavel, setResponsavel] = useState();
  const [logs, setLogs] = useState();
  const [projetos, setProjetos] = useState();
  const [users, setUsers] = useState();
  const boxRef = useRef(null);
  const [totalValue, setTotalValue] = useState(0);
  const { newRow = () => { }, resolve = () => { } } = promiseArguments || {};
  const controlEdit = () => {

    return role != "USER";
  };
  const manangerService = () => {
    return role != "MANAGER";
  }
  let token = localStorage.getItem("JWT");
  let user = localStorage.getItem("user");
  const logoutMethod = async (user) => {
    const data = {
      login: user,
    };
    Swal.fire({
      title: "Sua sessão foi encerrada faça login novamente",
      text: "Sessão temporariamente expirada, faça login novamente para autenticar no sistema.",
      allowOutsideClick: false,
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosGeneralRequest.logout(data);

        if (response.status == 200) {
          console.log(response.data.isLogged);
          localStorage.setItem("isLogged", response.data.isLogged);
          console.log("usuario deslogado");
          navigate("/");
        }
        localStorage.removeItem("JWT");

        Swal.close();
      }
    });
  };

  const showAllItems = async () => {
    try {
      const response = await axiosGeneralRequest.get(token);
      if (response.status === 200) {
        console.log("Dados iniciais carregados com sucesso.");
        setData(response.data);
        console.log("reload executado");
      }
    } catch (error) {
      if (error.response?.status == 403) {
        console.log("sessao expirada");
        await logoutMethod(user);
      }
      console.error("Erro ao buscar os dados iniciais:", error);
    }
  };

  const callLogs = async () => {
    const response = await axiosGeneralRequest.log(token);
    if (response.status === 200) {
      setLogs(Object.values(response.data));
    }
  };
  console.log(logs);
  const handleCostCenter = async () => {
    try {
      const response = await axiosGeneralRequest.costCenter(token);
      if (response.status == 200) {
        setProjetos(Object.values(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsers = async () => {
    try {
      const response = await axiosGeneralRequest.users(token);
      if (response.status == 200) {
        setUsers(Object.values(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleresponsible = async () => {
    try {
      const response = await axiosGeneralRequest.responsibles(token);
      if (response.status == 200) {
        setResponsavel(Object.values(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatValueMoney = (valor) => {
    if (valor === null || valor === undefined) return "";

    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);

    const [currencySymbol, numberValue] = formattedValue.split("R$");
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ width: "20%" }}>R$</span>
        <span style={{ width: "80%", display: "flex", justifyContent: "end" }}>
          {numberValue.trim()}
        </span>
      </div>
    );
  };

  useEffect(() => {
    setTotalValue(data?.reduce((acc, row) => acc + (row.valor_item || 0), 0));
  }, [data]);

  const columns = [
    // SITUAÇÃO DE CADASTRO
    {
      field: "situacao_registro",
      headerName: "SITUAÇÃO DE CADASTRO",
      align: "center",
      headerAlign: "center",
      width: 200,
      type: "singleSelect",
      renderHeader: () => (
        <span className="header_style">SITUAÇÃO DE CADASTRO</span>
      ),
      valueOptions: ["Concluido", "Pendente", "Em andamento", "Excluido"],

      renderCell: (params) => {


        switch (params.value) {
          case "Concluido":
            return (
              <Chip
                size="small"
                color="success"
                icon={<CheckCircleIcon />}
                label={params.value}
              />
            );

          case "Pendente":
            return (
              <Chip
                size="small"
                color="warning"
                icon={<WarningIcon />}
                label={params.value}
              />
            );

          case "Em andamento":
            return (
              <Chip
                size="small"
                color="info"
                icon={<InfoIcon />}
                label={params.value}
              />
            );
          case "Excluido":
            return (
              <Chip
                size="small"
                color="grey"
                label={params.value}
              />
            );
          default:
            break;


        }



      },
      editable: role === "SECRETARY"
    },
    ///ID
    {
      field: "id_item",
      headerName: "LINHA",
      align: "center",
      headerAlign: "center",
      width: 80,
      renderHeader: () => <span className="header_style">LINHA</span>,
      renderCell: (params) => (
        <span style={{ fontWeight: 800 }}>{params.value}</span>
      ),
      editable: controlEdit(),
    },
    //IMPRIMIR
    {
      field: "imprimir",
      headerName: "imprimir",
      align: "left",
      headerAlign: "center",
      width: 150,
      renderHeader: () => <span className="header_style">RELATÓRIO</span>,
      renderCell: (param) => {
        return (
          <Button onClick={() => handlePrint(param.row)}>
            <Chip
              style={{ backgroundColor: "grey", color: "white" }}
              size="small"
              icon={<PrintIcon color="#578FCA" />}
              label={<span>imprimir</span>}
            />
          </Button>
        );
      },
      editable: false,
    },
    //UPDATE DATE
    {
      field: "updateIn",
      headerName: "ULTIMA ATUALIZAÇÃO",
      editable: false,

      width: 150,
      renderHeader: () => (
        <span className="header_style">ULTIMA ATUALIZAÇÃO</span>
      ),
      renderCell: (params) => {
        if (!params.value) return <span>-</span>;

        const formattedDate = format(params.value, "dd-MM-yyyy HH:mm");
        return <span>{formattedDate}</span>;
      },
    },
    //CODIGO DO ITEM
    {
      field: "codigo_item",
      headerName: "Nº PATRIMÔNIO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">Nº PATRIMÔNIO</span>,
      width: 150,
      editable: true,
    },
    //DESCRIÇÃO DO ITEM
    {
      field: "descricao_item",
      headerName: "DESCRIÇÃO DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span className="header_style">DESCRIÇÃO DETALHADA DE ITENS</span>
      ),
      width: 420,
      editable: controlEdit(),
    },

    //NF E INVOICE
    {
      field: "nf_invoice_item",
      headerName: "Nº NF/INVOICE/NF-e",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span className="header_style">Nº NF/INVOICE/NF-e</span>
      ),
      renderCell: (params) => {
        const nf = params.value
        if (nf === "0000") {
          return <div style={{ backgroundColor: "#A62C2C", color: "white" }}>Nota fiscal não foi fornecida</div>
        } else {
          return <div >{params.value}</div>
        }
      },
      width: 250,
      editable: controlEdit(),
    },
    //CAMINHO DA IMAGEM
    {
      field: "caminho_imagem_item",
      headerName: "IMAGEM GERAL",
      align: "center",
      headerAlign: "center",
      width: 150,
      renderHeader: () => <span className="header_style">IMAGENS DO ITEM</span>,
      editable: controlEdit(),
      renderCell: (params) => {
        const handleImages = async (params) => {
          const rowOfImages = params.row;
          const { value: input1 } = await Swal.fire({
            title: "Atualizar imagem do item",
            // input: "text",
            html: `
              <div style="
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                text-align: center; 
                
                max-height: 600px; 
                overflow-y: auto; 
                padding: 20px;
              ">
                <p style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">
                  Insira o link da imagem e prossiga em continuar para atualizar.
                </p>
                
                <div style="
                  display: flex; 
                  justify-content: center; 
                  gap: 30px; 
                  max-width: 100%; 
                  flex-wrap: nowrap; 
                  align-items: center;
                ">
                  <!-- Primeira Imagem -->
                  <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                  ">
                    <a href="${params.value[0]}" target="_blank" style="display: block;">
                      <img src="${params.value[0]}" alt="Imagem exemplo 1"
                        style="width: 100%; max-width: 350px; height: auto; max-height: 300px; 
                        border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);" />
                    </a>
                    <p style="
                      background-color: #FF9800; 
                      color: white; 
                      padding: 8px 12px; 
                      border-radius: 15px; 
                      font-size: 14px; 
                      font-weight: bold; 
                      margin-top: 10px; 
                      display: inline-block;
                    ">
                      Imagem geral patrimônio
                    </p>
                  </div>
          
                  <!-- Segunda Imagem -->
                  <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                  ">
                    <a href="${params.value[1]}" target="_blank" style="display: block;">
                      <img src="${params.value[1]}" alt="Imagem exemplo 2"
                        style="width: 100%; max-width: 350px; height: auto; max-height: 300px; 
                        border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);" />
                    </a>
                    <p style="
                      background-color: #FF9800; 
                      color: white; 
                      padding: 8px 12px; 
                      border-radius: 15px; 
                      font-size: 14px; 
                      font-weight: bold; 
                      margin-top: 10px; 
                      display: inline-block;
                    ">
                      Imagem tag patrimônio
                    </p>
                  </div>
                </div>
              </div>
            `,
            width: 800, // Define a largura do modal
            confirmButtonColor: "#1976d2",
            confirmButtonText: "continuar",
            showClass: {
              popup: "animate__animated animate__fadeIn", // Animação de entrada com zoom
            },
            // inputLabel: "Insira a imagem geral do item.",
            // inputPlaceholder: "Cole ou digite o link aqui",
            showCancelButton: true,
            // inputAttributes: {
            //   "aria-label": "Digite o primeiro campo",
            // },
          });

          if (!input1) return; // Se o campo 1 não foi preenchido, sai da função.

          // Segundo campo
          const { value: input2 } = await Swal.fire({
            title: "Imagem da TAG do item",
            input: "text",
            html: `
            <img src="${input1}" alt="Imagem exemplo" style="display:block; margin:auto; max-width:50%;" />
          `,
            showClass: {
              popup: "animate__animated animate__fadeIn", // Animação de entrada com zoom
            },
            inputLabel: "OK! agora insira a imagem da TAG do item.",
            confirmButtonColor: "#1976d2",
            confirmButtonText: "continuar",
            inputPlaceholder: "Cole ou digite o link aqui",
            showCancelButton: true,
            inputAttributes: {
              "aria-label": "Digite o segundo campo",
            },

            preConfirm: (value) => {
              if (!value) {
                Swal.showValidationMessage(
                  "Por favor, preencha o segundo campo!"
                );
                return false;
              }
              return value;
            },
          });

          if (input1 && input2) {
            console.log("Primeiro Campo:", input1);
            console.log("Segundo Campo:", input2);
            Swal.fire({
              showClass: {
                popup: "animate__animated animate__fadeIn", // Animação de entrada com zoom
              },
              title: "confirme esta ação",
              confirmButtonText: "salvar",
              confirmButtonColor: "green",
              html: `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 100%; max-height: 300px; overflow-y: auto;">
                <p style="margin-bottom: 20px;">Verifique se os dados inseridos estão corretos. Caso estejam, selecione OK; caso contrário, cancele e repita o processo.</p>
                <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
                  <div style="max-width: 45%; text-align: center;">
                  <p style="background-color: #FFB84D; color: white; padding: 5px 10px; border-radius: 10px; font-size: 14px;">Imagem geral patrimônio</p>
                    <img src="${input1}" alt="Imagem exemplo 1" style="width: 100%; height: auto; margin-bottom: 10px;" />
        
                  </div>
                  <div style="max-width: 45%; text-align: center;">
                  <p style="background-color: #FFB84D; color: white; padding: 5px 10px; border-radius: 10px; font-size: 14px;">Imagem tag patrimônio</p>
                    <img src="${input2}" alt="Imagem exemplo 2" style="width: 100%; height: auto; margin-bottom: 10px;" />
    
                  </div>
                </div>
              </div>
            `,
            }).then(async (result) => {
              if (result.isConfirmed) {
                const images = { image1: input1, image2: input2 };
                console.log(images.image1);
                handleYes(images, rowOfImages.observacao_item, rowOfImages);
              }
            });
          }
        };
        return (
          <Button onClick={() => handleImages(params)}>
            <img
              src="https://github.com/Erikvilar/DASHBOARD-CRM/blob/production/src/images/Logo/image-gallery.png?raw=true"
              width={35}
              alt="images"
            />
          </Button>
        );
      },
    },

    //STATUS DO ITEM
    {
      field: "status_item",
      headerName: "SITUAÇÃO DO ITEM",
      align: "center",
      headerAlign: "center",
      width: 250,
      type: "singleSelect",

      renderHeader: () => (
        <span className="header_style">SITUAÇÃO DO ITEM</span>
      ),
      valueOptions: [
        "Estado Regular",
        "Estado Ruim",
        "Estado em Análise",
        "Estado em Manutenção",
      ],

      renderCell: (params) => {
        switch (params.value) {
          case "Estado Regular":
            return (
              <span>
                {" "}
                {params.value} <GrStatusGood color="green" size={18} />
              </span>
            );

          case "Estado Ruim":
            return (
              <span>
                {" "}
                {params.value} <GoAlert color="orange" size={18} />
              </span>
            );

          case "Estado em Análise":
            return (
              <span>
                {" "}
                {params.value} <GiMagnifyingGlass color="blue" size={18} />
              </span>
            );

          case "Estado em Manutenção":
            return (
              <span>
                {params.value} <BsTools size={18} color="brown" />
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

      width: 150,
      renderHeader: () => <span className="header_style">VALOR DO ITEM</span>,
      renderCell: (params) => {
        return <div>{formatValueMoney(params.value)}</div>;
      },
      editable: controlEdit(),
    },
    //MARCA DO ITEM
    {
      field: "marca_descricao",
      headerName: "MARCA DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">MARCA DO ITEM</span>,
      width: 200,
      editable: controlEdit(),
    },
    //SERIE DESCRIÇÃO
    {
      field: "serie_descricao",
      headerName: "SERIAL",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">SERIAL</span>,
      width: 120,
      editable: controlEdit(),
    },
    //MODELO DE DESCRIÇÃO
    {
      field: "modelo_descricao",
      headerName: "MODELO DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">MODELO DO ITEM</span>,
      width: 200,
      editable: controlEdit(),
    },
    //OBSERVAÇÕES DO ITEM
    {
      field: "observacao_item",
      headerName: "OBSERVAÇÕES",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">OBSERVÇÕES</span>,
      width: 150,
      editable: false,
      renderCell: (params) => {
        const rowOfObservation = params.row;

        const handleObservation = async (params) => {
          Swal.fire({
            input: "textarea",
            inputLabel: "Adicionar observação",

            inputPlaceholder: "Type your message here...",
            inputValue: params.value,

            confirmButtonColor: "#1976d2",
            didOpen: () => {
              const popup = Swal.getPopup();
              popup.style.width = "600px"; // Definindo a largura inline
              popup.style.padding = "30px"; // Ajustando o padding inline
            },
            inputAttributes: {
              "aria-label": "Type your message here",
            },
            showClass: {
              popup: "animate__animated animate__zoomIn", // Animação de entrada com zoom
            },
            showCancelButton: true,
            preConfirm: (value) => {
              if (!value) {
                Swal.showValidationMessage("Por favor, digite uma mensagem!");
                return false; // Impede o fechamento do modal
              }
              return value;
            },
          }).then(async (result) => {
            if (result.isConfirmed && result.value) {
              const text = result.value.trim();
              handleYes(
                rowOfObservation.caminho_imagem_item,
                text,
                rowOfObservation
              );
            }
          });
        };

        return (
          <Button onClick={() => handleObservation(params)}>
            {params.value !== "" ? (
              <img
                src="https://github.com/Erikvilar/DASHBOARD-CRM/blob/production/src/images/Logo/note.png?raw=true"
                width={35}
                alt="notes"
              />
            ) : (
              <img
                src="https://github.com/Erikvilar/DASHBOARD-CRM/blob/production/src/images/Logo/noteWithoutData.png?raw=true"
                width={35}
                alt="notes2"
              />
            )}
          </Button>
        );
      },
    },
    //TERMO
    {
      field: "termo",
      headerName: "Nº TERMO",
      type: "number",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">Nº TERMO</span>,
      width: 120,
      editable: controlEdit(),
    },
    {
      field: "pedido",
      headerName: "Nº Pedido",
      type: "number",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">Nº Pedido</span>,
      width: 120,
      editable: controlEdit(),
    },
    //LOCALIZAÇÃO DO ITEM
    {
      field: "localizacao_descricao",
      headerName: "LOCALIZAÇÃO DO ITEM",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">LOCALIZAÇÃO</span>,
      width: 200,
      editable: controlEdit(),
    },
    //LOTAÇÃO
    {
      field: "lotacao",
      headerName: "LOTAÇÃO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">LOTAÇÃO</span>,
      width: 200,
      editable: controlEdit(),
    },
    //FORNECEDOR
    {
      field: "fornecedor",
      headerName: "NOME FORNECEDOR",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">NOME FORNECEDOR</span>,
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
        <span className="header_style">EMAIL FORNECEDOR</span>
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
      renderHeader: () => <span className="header_style">Nº SDE</span>,
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
        <span className="header_style">TERMO DE RESPONSABILIDADE</span>
      ),
      renderCell: (params) => {
        return (
          <Button>
            {params.value != "" ? (
              <Link target="_blank" to={params.value}>
                <Chip
                  size="small"
                  style={{ backgroundColor: "white", color: "black" }}
                  icon={
                    <img
                      style={{ padding: 2 }}
                      src="https://media.licdn.com/dms/image/v2/D4D03AQGbqC3YigCopw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1690376033378?e=2147483647&v=beta&t=W5JbLsNij5IhmzmGwb3Iv2qQLaQQ740C7vqNWiXfuuI"
                      width={20}
                    />
                  }
                  label="Doc termo"
                />
              </Link>
            ) : (
              <Chip
                size="small"
                style={{ backgroundColor: "white", color: "black" }}
                icon={
                  <img
                    style={{ padding: 2 }}
                    src="src\images\Logo\cross.png"
                    width={15}
                  />
                }
                label="Vazio"
              />
            )}
          </Button>
        );
      },
      editable: false,
    },
    //PEDIDO PDF
    {
      field: "pedidoPDF",
      headerName: "DOCUMENTO PEDIDO",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderHeader: () => (
        <span className="header_style">DOCUMENTO PEDIDO</span>
      ),
      renderCell: (params) => {
        return (
          <Button>
            {params.value != "" ? (
              <Link target="_blank" to={params.value}>
                <Chip
                  style={{ backgroundColor: "cornflowerblue", color: "white" }}
                  size="small"
                  icon={
                    <img
                      style={{ padding: 5 }}
                      src="https://fau.org.br/wp-content/uploads/2023/05/Logo-nova-middle.png"
                      alt=""
                      width={50}
                    />
                  }
                  label="Doc Pedido"
                />
              </Link>
            ) : (
              <Chip
                style={{ backgroundColor: "cornflowerblue", color: "white" }}
                size="small"
                icon={
                  <img
                    style={{ padding: 2 }}
                    src="src\images\Logo\cross.png"
                    alt=""
                    width={15}
                  />
                }
                label="Vazio "
              />
            )}
          </Button>
        );
      },
      editable: false,
    },
    //EMPSIAFI
    {
      field: "empSIAFI",
      headerName: "EMPSIAFI",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">EMPSIAFI</span>,
      width: 120,
      editable: controlEdit(),
    },
    //NOME CENTRO DE CUSTO
    {
      field: "nome_centro_custo",
      headerName: "NOME DO PROJETO",
      align: "center",
      renderHeader: () => <span className="header_style">NOME DO PROJETO</span>,
      headerAlign: "center",
      width: 200,
      type: "singleSelect",
      valueOptions: projetos?.map((p) => p.nome_centro_custo),
      editable: controlEdit(),
    },
    //IDENTIFICAÇÃO DO PROJETO
    {
      field: "identificacao_centro_custo",
      headerName: "IDENTIFICAÇÃO DO PROJETO",
      align: "center",
      renderHeader: () => (
        <span className="header_style">IDENTIFICAÇÃO DO PROJETO</span>
      ),
      headerAlign: "center",

      width: 200,
      editable: false,
    },

    //DATA DE INICIO
    {
      field: "data_inicio_centro_custo",
      headerName: "DATA INÍCIO PROJETO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span className="header_style">DATA INÍCIO PROJETO</span>
      ),
      renderCell: (params) => <span>{format(params.value, "dd-MM-yyyy")}</span>,
      width: 200,
      editable: false,
    },
    //DATA FIM
    {
      field: "data_fim_centro_custo",
      headerName: "DATA FIM PROJETO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span className="header_style">DATA FIM PROJETO</span>
      ),
      renderCell: (params) => {
        return <p>{format(params.value, "dd-MM-yyyy")}</p>
      },
      width: 200,
      editable: false,
    },
    //NOME DO USUARIO
    {
      field: "nome_usuario",
      headerName: "RESPONSÁVEL IMEDIATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span className="header_style">RESPONSÁVEL IMEDIATO</span>
      ),
      type: "singleSelect",
      valueOptions: users?.map((u) => u.nome_usuario),
      width: 200,
      editable: controlEdit(),
    },
    //OCUPAÇÃO DO IMEDIATO"
    {
      field: "tipo_usuario",
      headerName: "OCUPAÇÃO DO IMEDIATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">OCUPAÇÃO</span>,
      width: 250,
      editable: false,
    },
    //TELEFONE DO IMEDIATO
    {
      field: "telefone_usuario",
      headerName: "TELEFONE DO IMEDIATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">TELEFONE</span>,
      width: 250,
      editable: false,
    },
    //EMAIL DO IMEDIATO
    {
      field: "email_usuario",
      headerName: "EMAIL DO IMEDIATO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">EMAIL</span>,
      width: 250,
      editable: false,
    },
    //RESPONSAVEL GERAL
    {
      field: "nome_responsavel_geral",
      headerName: "RESPONSÁVEL GERAL",
      align: "center",
      headerAlign: "center",
      width: 200,
      type: "singleSelect",
      valueOptions: responsavel?.map((r) => r.nome_responsavel_geral),
      editable: controlEdit(),
    },
    //OCUPAÇÃO DO RESPONSAVEL
    {
      field: "ocupacao_responsavel",
      headerName: "OCUPAÇÃO DO RESPONSÁVEL",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">OCUPAÇÃO </span>,
      width: 250,
      editable: false,
    },
    //EMAIL CONTATO
    {
      field: "email_responsavel_geral",
      headerName: "EMAIL RESPONSÁVEL GERAL",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">EMAIL</span>,
      width: 250,
      editable: false,
    },
    //TELEFONE CONTATO
    {
      field: "telefone_responsavel_geral",
      headerName: "TELEFONE RESPONSÁVEL",
      align: "center",
      headerAlign: "center",
      renderHeader: () => <span className="header_style">TELEFONE</span>,
      width: 200,
      editable: false,
    },
    //PESSOA QUEM REGISTROU ULTIMA MODIFICAÇÃO <-- CAMPO IMPORTANTE
    {
      field: "lastModify",
      headerName: "ALTERADO",
      align: "center",
      headerAlign: "center",
      renderHeader: () => (
        <span className="header_style">REGISTRO DE ALTERAÇÃO</span>
      ),
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 50,
          }}
        >
          {Object.values(params.value) != "" ? (
            <Chip
              style={{ backgroundColor: "grey", color: "white" }}
              avatar={<Avatar alt="pessoa" src={params.value} />}
              label={
                <span style={{ textTransform: "uppercase" }}>
                  {params.value[0]}
                </span>
              }
            />
          ) : (
            <Chip
              style={{
                backgroundColor: "#FFB200",
                color: "white",
                fontWeight: 700,
              }}
              label="Item recém criado"
            />
          )}
        </div>
      ),
      width: 180,
      editable: false,
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

  const handleMessage = async (newMessage) => {
    const { tokenEmit } = newMessage;

    console.log(tokenEmit);

    if (tokenEmit.toString() !== token) {
      var id = newMessage.body.itemsDTO.id_item;
      toast.info(`${user} alterou a linha ${id}`);
    }

    //Message from emmitter
    const convertedData = {
      ...newMessage.body.contactsDTO,
      ...newMessage.body.costCenterDTO,
      ...newMessage.body.detailsDTO,
      ...newMessage.body.usersDTO,
      ...newMessage.body.itemsDTO,
      ...newMessage.body.responsibleDTO,
      ...newMessage.body.receivingDTO,
    };

    //Structure to update the row sent to the backend
    const updatedItem = {
      id_item: newMessage.body.itemsDTO.id_item,
      ...convertedData,
    };
    setData((prevData) => {
      const updatedData = prevData.map((item) =>
        //Here the error is caused because the data does not yet exist
        item.id_item === updatedItem.id_item ? updatedItem : item
      );

      return updatedData;
    });
    callLogs();
  };

  useEffect(() => {
    initializeWebSocket(navigate);
  }, [message]);

  useEffect(() => {
    eventEmitter.on("messageReceived", handleMessage);
    return () => eventEmitter.off("messageReceived", handleMessage);
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [logs])

  //handler data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          showAllItems(),
          handleCostCenter(),
          handleUsers(),
          handleresponsible(),
          callLogs(),
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const getBrazilianDateTime = () => {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", {
      timeZone: "America/Sao_Paulo",
    });
  };

  const handleYes = async (images, text, rows) => {
    const update = rows;
    resolve(rows);

    setOpenDialog(false);
    try {
      const dateGMT3 = getBrazilianDateTime();
      const randomUUID = Math.random().toPrecision(5)
      //structure send to backend
      const dataUpdate = {
        itemsDTO: {
          id_item: update.id_item,
          nf_invoice_item: update.nf_invoice_item,
          codigo_item: update.situacao_registro === "Excluido" ? update.codigo_item + " Excluido Nº processo " + randomUUID : update.codigo_item,
          observacao_item: text ? text : update.observacao_item,
          caminho_imagem_item: [
            images.image1 ? images.image1 : update.caminho_imagem_item[0],
            images.image2 ? images.image2 : update.caminho_imagem_item[1],
          ],
          pedido_origem: update.pedido_origem,
          sde_item: update.sde_item,
          status_item: update.status_item,
          situacao_registro: update.situacao_registro,
          valor_item: update.valor_item,
          lastModify: [
            localStorage.getItem("user"),
            localStorage.getItem("avatar"),
          ],
          updateIn: dateGMT3,
        },
        usersDTO: {
          id_usuario: update.id_usuario,
          nome_usuario: update.nome_usuario,
          tipo_usuario: update.tipo_usuario,
          email_usuario: update.email_usuario,
          telefone_usuario: update.telefone_usuario,
        },
        responsibleDTO: {
          id_responsavel_geral: update.id_responsavel_geral,
          nome_responsavel_geral: update.nome_responsavel_geral,
          ocupacao_responsavel: update.ocupacao_responsavel,
          email_responsavel_geral: update.email_responsavel_geral,
          telefone_responsavel_geral: update.telefone_responsavel_geral,
        },
        detailsDTO: {
          id_descricao: update.id_descricao,
          marca_descricao: update.marca_descricao,
          descricao_item: update.descricao_item,
          localizacao_descricao: update.localizacao_descricao,
          modelo_descricao: update.modelo_descricao,
          serie_descricao: update.serie_descricao,
        },
        costCenterDTO: {
          id_centro_custo: update.id_centro_custo,
          nome_centro_custo: update.nome_centro_custo,
          identificacao_centro_custo: update.identificacao_centro_custo,
          data_inicio_centro_custo: update.data_inicio_centro_custo,
          data_fim_centro_custo: update.data_fim_centro_custo,
        },
        contactsDTO: {
          id_contato: update.id_contato,
          email_contato: update.email_contato,
          ocupacao_contato: update.ocupacao_contato,
          responsavel_geral: update.responsavel_geral,
          telefone_contato: update.telefone_contato,
        },
        receivingDTO: {
          id_recebimento: update.id_recebimento,
          termo: update.termo,
          lotacao: update.lotacao,
          fornecedor: update.fornecedor,
          email_fornecedor:
            update.email_fornecedor != null ? update.email_fornecedor : "vazio",
          termoPDF: update.termoPDF != null ? update.termoPDF : "vazio",
          pedidoPDF: update.pedidoPDF != null ? update.pedidoPDF : "vazio",
          pedido: update.pedido,
          empSIAFI: newRow.empSIAFI,
        },
      };

      const response = await axiosGeneralRequest.put(dataUpdate, token);
      if (response.status == 202) {
        sendWebSocketMessage("/app/join", response.data);
        toast.success("Dados atualizados");
        callLogs();
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
          localStorage.getItem("JWT")
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
    console.log(row.caminho_imagem_item[0]);
    try {
      setLoading(true);
      const print = {
        image1: row.caminho_imagem_item[0],
        image2: row.caminho_imagem_item[1],
        descricao: row.descricao_item,
        projeto: row.nome_centro_custo,
        pedido: row.pedido_origem,
        nf: row.nf_invoice_item,
        fornecedor: row.fornecedor,
        email_fornecedor: row.email_fornecedor,
        valor: row.valor_item,
        patrimonio: row.codigo_item,
        status: row.status_item,
        marca: row.marca_descricao,
        coordenador: row.nome_responsavel_geral,
        SDE: row.sde_item,
        responsavel: row.nome_usuario,
        local: row.localizacao_descricao,
        modelo: row.modelo_descricao,
        serial: row.serie_descricao,
        ultimaModificacao: row.lastModify[0],
        horaUltimaModificacao: row.updateIn,
        termo: row.termo,
      };



      navigate("/print", { state: print })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    <Box style={{ maxHeight: "100vh" }}>
      {openDialog && (
        <Dialogs
          open={openDialog}
          close={handleNo}
          handleY={() => handleYes(newRow.caminho_imagem_item, "", newRow)}
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
        style={{
          maxHeight: "84vh",
          height: "85vh",
          width: 1600,
          scrollbarWidth: "thin",
        }}
        getRowId={(row) => row.id_item}
        columnVisibilityModel={columnsVisibility}
        density="standard"
        onColumnVisibilityModelChange={(newModel) =>
          setColumnsVisibility(newModel)
        }
        processRowUpdate={(newRow, oldRow) => processRowUpdate(newRow, oldRow)}
        localeText={{
          toolbarColumns: "Definir Colunas",
          toolbarFilters: "Filtrar",
          noRowsLabel: (
            <div>
              <Bounce color="#727981" size={12} speed={1} animating={true} />
            </div>
          ),
        }}
        slots={{
          toolbar: () => (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <GridToolbarQuickFilter
                  variant="filled"
                  style={{ width: 600 }}
                  placeholder="Pesquisar"
                />
                <div
                  style={{
                    width: 350,
                    height: 30,
                    marginTop: 20,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    fontSize: 18,
                    paddingLeft: 10,
                    marginRight: 30,
                    backgroundColor: "orange"
                  }}
                >
                  <span style={{ fontWeight: 700, color: "white" }}>Custo total: </span>
                  <CountUp
                    style={{ fontWeight: 700, color: "white" }}
                    start={0}
                    end={totalValue}
                    duration={1.5}
                    separator="."
                    decimals={2}
                    decimal=","
                    prefix="R$  "

                  />
                </div>
              </div>
              <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
              </GridToolbarContainer>
            </>
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
            backgroundColor: "#4C585B !important",
            color: "white",
            cursor: "pointer",
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: " !important",
            color: "white",
            cursor: "pointer",
          },
        }}
      />

      <Box
        ref={boxRef}
        className="boxRef"
        sx={{
          // Deixe a altura automática ou ajuste conforme necessário
          maxHeight: "70px",       // Ou limite a altura a 80% da altura da janela
          width: "90%",
          paddingLeft: 2,
          overflowY: "auto",       // Permite rolagem se o conteúdo exceder a altura
          fontSize: 13,
          scrollBehavior: "smooth",
          display: "flex",
          scrollSnapType: "y",
          flexDirection: "column", // Coloquei flexDirection: "column" para alinhar os logs em coluna
          alignItems: "flex-start", // Certifique-se de alinhar os itens à esquerda
        }}
      >
        <Box>
          {logs?.map((log) => (
            <div
              key={log.id}
              style={{
                scrollSnapAlign: "center",
                lineHeight: "2",
                height: "auto",         // Deixe a altura automática para se ajustar ao conteúdo
                marginBottom: 20,       // Deixe o espaçamento entre os itens de log
                display: "flex",
                justifyContent: "flex-start",
              }}

            >
              {log.type == "update" ? <span> <FcInfo size={20} /> {log.userLog} atualizou em {format(log.timestamp, "dd-MM-yyyy")} as {format(log.timestamp, "HH:MM")} a linha {log.entityId}  na coluna {log.fieldName} de <span>{log.oldValue}</span>  para  <span >{log.newValue}</span> </span> : <span><FcOk size={20} /> {log.userLog} em {format(log.timestamp, "dd-MM-yyyy")} as {format(log.timestamp, "HH:MM")} cadastrou {log.newValue} </span>}

            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
