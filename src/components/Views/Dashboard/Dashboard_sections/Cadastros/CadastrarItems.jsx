import { FormControl, MenuItem, Select } from "@mui/material";
import {
  MdCleaningServices,
  MdDeleteForever,
  Button,
  AiOutlineProduct,
  useEffect,
  useState,
  axiosGeneralRequest,
  sweetAlerts,
  Row,
  Form,
  Col,
} from "./index.js";
import { useDemoRouter } from "@toolpad/core/internal";
import { useRef } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";
import Unauthorized from "../../../visualAccess/unauthorized.jsx";
export default function CadastrarItems({ role }) {
  
  const [nextId, setNextId] = useState(1);
  const formRefs = useRef([]);
  const [users, setUsers] = useState();
  const [projetos, setProjetos] = useState();
  const [responsibles, setResponsibles] = useState();
  const token = localStorage.getItem("JWT");
  const router = useDemoRouter();

  const getBrazilianDateTime = () => {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS", {
      timeZone: "America/Sao_Paulo",
    });
  };

  const [dateTime, setDateTime] = useState(getBrazilianDateTime());


  const addItem = () => {
    setData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          id: nextId,
          nf_invoice_item: "",
          codigo_item: "",
          processoSEI: "",
          observacao_item: "",
          caminho_imagem_item: [],
          pedido_origem: "",
          sde_item: "",
          status_item: "Estado regular",
          situacao_registro: "Pendente",
          valor_item: "",
          updateIn: dateTime,
          detailsDTO: {
            marca_descricao: "",
            descricao_item: "",
            localizacao_descricao: "",
            modelo_descricao: "",
            serie_descricao: "",
          },
          userId: "",
          responsibleId:"",
          costCenterId: "",
        },
      ],
    }));
    setNextId((prev) => prev + 1);
  };

  const removeItem = async (idToRemove) => {
    const result = await sweetAlerts.deleteAlert();
    if (result)
      setData((prevData) => {
        if (prevData.items.length === 1) return prevData;
        return {
          ...prevData,
          items: prevData.items.filter((_, i) => i !== idToRemove),
        };
      });
  };

  const [data, setData] = useState({
    receivingDTO: {
      termo: null,
      lotacao: "",
      fornecedor: "",
      email_fornecedor: "",
      termoPDF: "",
      pedidoPDF: "",
      empSIAFI: "",
    },
    items: [
      {
        id: nextId,
        nf_invoice_item: "",
        codigo_item: "",
        processoSEI: "",
        observacao_item: "",
        caminho_imagem_item: [],
        pedido_origem: "",
        sde_item: "",
        status_item: "Estado Regular",
        situacao_registro: "Pendente",
        valor_item: "",
        updateIn: dateTime,
        detailsDTO: {
          marca_descricao: "",
          descricao_item: "",
          localizacao_descricao: "",
          modelo_descricao: "",
          serie_descricao: "",
        },
        userId: "",
        responsibleId:"",
        costCenterId: "",
      },
    ],
  });

  const handleInputChange = (e, index, field, nested = false) => {
    const { name, value } = e.target;
    setDateTime(getBrazilianDateTime());
    if (name.startsWith("receivingDTO")) {
      const fieldKey = name.replace("receivingDTO.", "");

      setData((prevData) => ({
        ...prevData,
        receivingDTO: {
          ...prevData.receivingDTO,
          [fieldKey]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        items: prevData.items.map((item, i) => {
          if (i === index) {
            if (nested) {
              return {
                ...item,
                detailsDTO: {
                  ...item.detailsDTO,
                  [field]: value,
                },
              };
            }
            return { ...item, [field]: value };
          }
          return item;
        }),
      }));
    }
  };

  const handleCostCenter = async () => {
    try {
      const response = await axiosGeneralRequest.costCenter(token);
      if (response.status == 200) {
        setProjetos(Object.values(response.data));

      }
    } catch (error) {
  
    }
  };

  const handleUsers = async () => {
    try {
      const response = await axiosGeneralRequest.users(token);
      if (response.status == 200) {
        setUsers(Object.values(response.data));

      }
    } catch (error) {
   
    }
  };

  const handleResponsibles = async()=>{
    try{
      const response = await axiosGeneralRequest.responsibles(token);
    if(response.status == 200){
      setResponsibles(Object.values(response.data))
      console.log(responsibles)
    }
    }catch(error){
      console.log("ocorreu um erro ao trazer os responsavel", error)
    }
  
  }

  const handleImageChange = (e, index, imageIndex) => {
    const { value } = e.target;
    setData((prevData) => {
      const newItems = [...prevData.items];
      newItems[index].caminho_imagem_item[imageIndex] = value;
      return { ...prevData, items: newItems };
    });
  };

  useEffect(() => {
    if (formRefs.current.length > 0) {
      formRefs.current[formRefs.current.length - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data.items.length]);



  useEffect(() => {
    handleCostCenter();
    handleUsers();
    handleResponsibles();
  }, []);

  const verifyDupliChecker = (items) => {
    const codigos = items.map((item) => item.codigo_item);
    const codigosUnicos = new Set(codigos);

    return codigos.length !== codigosUnicos.size;
  };

  const submitForms = async (e) => {
    e.preventDefault();
    const result = await sweetAlerts.submitAlert();
    if (verifyDupliChecker(data.items)) {
      Swal.fire({
        icon: "error",
        title: "Codigos duplicados encontrados",
        text: "Há números de patrimonios duplicados por favor verifique.",
        allowOutsideClick: false,
      });
      return;
    }
    if (result) {
      Swal.fire({
        title: "Enviando dados...",
        text: "Aguarde enquanto processamos a requisição.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Tempo limite excedido")), 3000)
      );

      try {
        const response = await Promise.race([
          axiosGeneralRequest.post(data, token),
          timeout,
        ]);
 
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: response?.data,
        });
      } catch (error) {
       
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: error.response?.data,
        });
      }
    }
  };

  return role === "USER" || null ? (
    <Unauthorized/>
  ) : (
    <Form style={{ borderWidth: 1 }} onSubmit={submitForms}>
      <div
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          marginBottom: 10,
        }}
      >
        <h3
          style={{
            color: "white",
            width: "60%",
            padding: 20,
            textAlign: "left",
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: "bold",
          }}
        >
          página de cadastro
          <AiOutlineProduct size={30} style={{ marginLeft: 20 }} />
        </h3>
      </div>

      {/* Recebimento */}
      <fieldset style={{ borderWidth: 1, marginBottom: 15 }}>
        <div style={{ marginTop: 5, marginBottom: 30 }}>
          <strong style={{ paddingLeft: 30, paddingRight: 30 }}>Aviso!</strong>
          <p style={{ paddingLeft: 30, paddingRight: 30 }}>
            Abaixo deve ser cadastro primariamente os dados do termo de
            responsabilidade fornecido pelo DIPAT e em seguida deve ser
            fornecido dados dos equipamentos que consta no termo, cada campo
            deve ser preenchido e será permitido campos nulos.
          </p>
          <p style={{ paddingLeft: 30, paddingRight: 30 }}>
            <b style={{ color: "red" }}>*</b>E nescessário fornecer imagens para
            cada item, campos nulos ou imagens que não pertençam ao item não
            serão aceitas.
          </p>
          <p style={{ paddingLeft: 30, paddingRight: 30 }}>
            Caso dúvidas ou questionamentos favor reportar ao seguinte{" "}
            <a href="mailto:erik.alves@ltad.com.br">E-mail</a>, ou contate @Erik
            Alves no Teams.
          </p>
        </div>
        <legend>
          <h3 style={{ color: "white", padding: 20, width: "70%" }}>
            Dados do termo de responsabilidade
          </h3>
        </legend>
        <div style={{ padding: 20 }}>
          <Row>
            {Object.keys(data.receivingDTO).map((fieldKey) => (
              <Form.Group
                as={Col}
                controlId={`receivingDTO.${fieldKey}`}
                key={fieldKey}
              >
                <Form.Label
                  style={{ textTransform: "uppercase", letterSpacing: 2 }}
                >
                  {fieldKey.replace(/_/g, " ")}
                </Form.Label>

                <Form.Control
                  placeholder={fieldKey.replace(/_/g, " ")}
                  name={`receivingDTO.${fieldKey}`}
                  type="text"
                  value={data.receivingDTO[fieldKey]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
          </Row>
        </div>
      </fieldset>

      {/* Registro de Itens */}
      <div
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          marginBottom: 10,
        }}
      >
        <h3 style={{ color: "white", padding: 20, width: "80%" }}>
          Dados do equipamento
        </h3>
      </div>
      {data.items.map((item, index) => (
        <fieldset
          key={index}
          className="box-add"
          ref={(el) => (formRefs.current[index] = el)}
        >
          <legend style={{ textAlign: "left", margin: 20 }}>
            <h5>{`${item.detailsDTO.descricao_item == "" ? "Equipamento" : item.detailsDTO.descricao_item} -  ${index + 1}`}</h5>
          </legend>

          <Row style={{ padding: 10 }}>
            <Form.Group as={Col} controlId={`codigo_item_${index}`}>
              <Form.Label>Número Patrimônio</Form.Label>
              <Form.Control
                required
                placeholder={"Insira o número"}
                type="text"
                value={item.codigo_item}
                onChange={(e) => handleInputChange(e, index, "codigo_item")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`descricao_item_${index}`}>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                required
                placeholder={"Insira a descrição do item"}
                type="text"
                value={item.detailsDTO.descricao_item}
                onChange={(e) =>
                  handleInputChange(e, index, "descricao_item", true)
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`marca_descricao_${index}`}>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                required
                placeholder={"Insira a marca do item"}
                type="text"
                value={item.detailsDTO.marca_descricao}
                onChange={(e) =>
                  handleInputChange(e, index, "marca_descricao", true)
                }
              />
            </Form.Group>
          </Row>

          <Row style={{ padding: 10 }}>
            <Form.Group as={Col} controlId={`modelo_descricao_${index}`}>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                required
                placeholder={"Insira o modelo do item"}
                type="text"
                value={item.detailsDTO.modelo_descricao}
                onChange={(e) =>
                  handleInputChange(e, index, "modelo_descricao", true)
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`serie_descricao_${index}`}>
              <Form.Label>Série</Form.Label>
              <Form.Control
                required
                placeholder={"Insira o número de serie ou service TAG"}
                type="text"
                value={item.detailsDTO.serie_descricao}
                onChange={(e) =>
                  handleInputChange(e, index, "serie_descricao", true)
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`localizacao_descricao${index}`}>
              <Form.Label>Localização</Form.Label>
              <Form.Control
                required
                placeholder={"Informe onde este item está alocado"}
                type="text"
                value={item.detailsDTO.localizacao_descricao}
                onChange={(e) =>
                  handleInputChange(e, index, "localizacao_descricao", true)
                }
              />
            </Form.Group>
          </Row>

          <Row style={{ padding: 10 }}>
            <Form.Group as={Col} controlId={`nf_invoice_item${index}`}>
              <Form.Label>NF/INVOICE</Form.Label>
              <Form.Control
                required
                placeholder={"NFe00000000000000000000000000000000000000000000"}
                type="number"
                value={item.nf_invoice_item}
                onChange={(e) => handleInputChange(e, index, "nf_invoice_item")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`processoSEI${index}`}>
              <Form.Label>Nº SEI</Form.Label>
              <Form.Control
                required
                placeholder={"000000"}
                type="number"
                value={item.processoSEI}
                onChange={(e) => handleInputChange(e, index, "processoSEI")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`observacao_item${index}`}>
              <Form.Label>Observações</Form.Label>
              <Form.Control
                placeholder={"teste"}
                type="text"
                value={item.observacao_item}
                onChange={(e) => handleInputChange(e, index, "observacao_item")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`pedido_origem${index}`}>
              <Form.Label>Nº Pedido</Form.Label>
              <Form.Control
                required
                placeholder={"000000"}
                type="number"
                value={item.pedido_origem}
                onChange={(e) => handleInputChange(e, index, "pedido_origem")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`sde_item${index}`}>
              <Form.Label>Nº SDE</Form.Label>
              <Form.Control
                required
                placeholder={"000000"}
                type="number"
                value={item.sde_item}
                onChange={(e) => handleInputChange(e, index, "sde_item")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId={`valor_item${index}`}>
              <Form.Label>Valor unitario</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  let rawValue = e.target.value.replace(/\D/g, "");
                  let numericValue = rawValue ? Number(rawValue) / 100 : 0;

                  handleInputChange(
                    { target: { name: "valor_item", value: numericValue } },
                    index,
                    "valor_item"
                  );
                }}
                placeholder={"R$: 00,00"}
                type="text"
                value={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.valor_item || 0)}
              />
            </Form.Group>
          </Row>
          <Row style={{ padding: 10 }}>
            <Form.Group as={Col} controlId={`caminho_imagem_item${index}`}>
              <Form.Label>Imagem completa</Form.Label>
              <Form.Control
                required
                placeholder={
                  "Copie e cole o link da imagem completa do item aqui"
                }
                type="text"
                value={item.caminho_imagem_item?.[0]}
                onChange={(e) => handleImageChange(e, index, 0)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId={`caminho_imagem_item${index}`}>
              <Form.Label>Imagem tag patrimonio</Form.Label>
              <Form.Control
                required
                placeholder={
                  "Copie e cole o link da imagem da TAG do patrimonio"
                }
                type="text"
                value={item.caminho_imagem_item?.[1]}
                onChange={(e) => handleImageChange(e, index, 1)}
              />
            </Form.Group>
          </Row>
          <Row style={{ padding: 10 }}>

            <Form.Group>
              <FormControl
                style={{ width: "33%" }}
                as={Col}
                controlId={`costCenterId${index}`}
              >
                <Form.Label>Projeto</Form.Label>
                <Select
                  value={item.costCenterId}
                  onChange={(e) => handleInputChange(e, index, "costCenterId")}
                  name={`costCenterId${index}`}
                >
                  <MenuItem value="" disabled>
                    Selecione um Centro de Custo
                  </MenuItem>
                  {projetos?.map((value) => (
                    <MenuItem
                      value={value.id_centro_custo}
                      key={value.id_centro_custo}
                    >
                      {value.identificacao_centro_custo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                style={{ width: "33%" }}
                as={Col}
                controlId={`userId${index}`}
              >
                <Form.Label>Usuario responsavel</Form.Label>
                <Select
                  value={item.userId}
                  onChange={(e) => handleInputChange(e, index, "userId")}
                  name={`userId${index}`}
                >
                  {users?.map((value) => (
                    <MenuItem value={value.id_usuario} key={value.id_usuario}>
                      {value.nome_usuario}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                style={{ width: "33%" }}
                as={Col}
                controlId={`responsibleId${index}`}
              >
                <Form.Label>Responsável Geral</Form.Label>
                <Select
                  value={item.responsibleId}
                  onChange={(e) => handleInputChange(e, index, "responsibleId")}
                  name={`responsibleId${index}`}
                >
                  {responsibles?.map((value) => (
                    <MenuItem value={value.id_responsavel_geral} key={value.id_responsavel_geral}>
                      {value.nome_responsavel_geral}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Form.Group>
          </Row>
          <Row style={{ padding: 10 }}>
            <div
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "space-between",
                margin: "auto",
              }}
            >
              {Object.values(item.caminho_imagem_item) != "" ? (
                <div style={{ margin: 30 }}>
                  <img
                    style={{ width: 350, height: 250, margin: 5 }}
                    src={item.caminho_imagem_item[0]}
                    alt=""
                  />
                  <img
                    style={{ width: 350, height: 250, margin: 5 }}
                    src={item.caminho_imagem_item[1]}
                    alt=""
                  />
                </div>
              ) : (
                <p style={{ textAlign: "center", margin: 50 }}>
                  Imagem do item aparecerá aqui
                </p>
              )}
            </div>
          </Row>

          <div
            className="buttons-tools"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Button
              style={{ margin: 10 }}
              variant="contained"
              onClick={addItem}
            >
              Adicionar Campo
            </Button>
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                style={{ margin: 10 }}
                onClick={() => removeItem(index)}
              >
                <span>Limpar campos</span>
                <MdCleaningServices size={25} />
              </Button>
              <Button
                variant="contained"
                style={{ margin: 10 }}
                onClick={() => removeItem(index)}
              >
                <span>Deletar</span>
                <MdDeleteForever size={25} />
              </Button>
            </div>
          </div>
        </fieldset>
      ))}
      <div
        style={{
          marginTop: 10,
          padding: 20,
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          variant="text"
          style={{
            backgroundColor: "red",
            color: "white",
            width: "10%",
            padding: 10,
            margin: 5,
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="text"
          type="submit"
          style={{
            backgroundColor: "yellowgreen",
            color: "white",
            width: "10%",
            padding: 10,
            margin: 5,
          }}
        >
          Salvar
        </Button>
      </div>
    </Form>
  );
}
