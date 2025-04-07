import { AppProvider, DashboardLayout } from "@toolpad/core";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';
import "./style.css";
import { format } from "date-fns";
export default function DocumentToPrint() {

  const location = useLocation();

  const componentRef = useRef(null);



  const handlePrint = useReactToPrint({
    documentTitle: "Title",
    contentRef: componentRef,
  });
  const {
    image1,
    image2,
    descricao,
    projeto,
    pedido,
    nf,
    fornecedor,
    email_fornecedor,
    valor,
    patrimonio,
    status,
   
    coordenador,
    SDE,
    responsavel,
    local,
    marca,
    modelo,
    serial,
    termo,
    ultimaModificacao,
    horaUltimaModificacao,
  } = location.state || {};
console.log(coordenador)
  const formatValue = (valor)=>{
  const value= new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
  return value;
}
  return (
    <AppProvider
      branding={{
        logo: <p></p>,
        title: (
          <h6 className="MuiTypography-h6 css-1je49cu-MuiTypography-root">
            Dashboard
          </h6>
        ),
      }}
    >
      <DashboardLayout disableCollapsibleSidebar hideNavigation>
        <button onClick={handlePrint} className="button-print"><PrintIcon size={24} className="printIcon"/></button>

        <div ref={componentRef} className="print-area">
          <div className="print-header">
            <div>
              <img src="https://comunica.ufu.br/sites/default/files/imagem/2023-08/logo-ufu%5B1%5D.png" />
            </div>
            <div>
              <p>
                Pró-reitoria de Panejamento e Administração Faculdade de
                Engenharia Mecânica Laboratório de Tecnologia em Atrito e
                Desgaste{" "}
              </p>
            </div>
            <div>
              <img
                src="https://embrapii.femec.ufu.br/sites/embrapii.femec.ufu.br/files//media/image/ltad_logo_inpi-01_2.png"
                alt=""
              />
            </div>
          </div>
          <div className="title-print">
            <span>Relátorio do item patrimoniado</span>
          </div>
          <div className="table-printable-view">
             {/**LINHA 1 */}
            <div className="row-pritable">
              <div className="column">
                {" "}
                <div className="column-title">Nº PATRIMÔNIO</div>{" "}
                <p className="content-text">{patrimonio}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">TERMO</div>{" "}
                <p className="content-text">{termo}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">PROJETO</div>{" "}
                <p className="content-text">{projeto}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">SDE </div>{" "}
                <p className="content-text">{SDE}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">PEDIDO</div>{" "}
                <p className="content-text">{pedido}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">RESPONSÁVEL</div>{" "}
                <p className="content-text">{responsavel}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">LOCAL</div>{" "}
                <p className="content-text">{local}</p>
              </div>
            </div>
            {/**LINHA 2 */}
            <div className="row-pritable">
              <div className="column">
                {" "}
                <div className="column-title">DESCRIÇÃO</div>{" "}
                <p className="content-text">{descricao}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">NF/INVOICE/NF-e</div>
                <p className="content-text">{nf}</p>{" "}
              </div>
            </div>
            {/**LINHA 3*/}
            <div className="row-pritable">
              <div className="column">
                {" "}
                <div className="column-title">MARCA</div>{" "}
                <p className="content-text">{marca}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">MODELO</div>
                <p className="content-text">{modelo}</p>{" "}
              </div>
              <div className="column">
                {" "}
                <div className="column-title">SERIAL</div>
                <p className="content-text">{serial}</p>{" "}
              </div>
              <div className="column">
                {" "}
                <div className="column-title">NF/INVOICE/NF-e</div>
                <p className="content-text">{nf}</p>{" "}
              </div>
            </div>

             {/**LINHA 4*/}
            <div className="row-pritable">
              <div className="column">
                {" "}
                <div className="column-title">FORNECEDOR</div>{" "}
                <p className="content-text">{fornecedor}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">EMAIL</div>{" "}
                <p className="content-text">{email_fornecedor}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">VALOR</div>{" "}
                <p className="content-text">{formatValue(valor)}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">ESTADO DO ITEM</div>{" "}
                <p className="content-text">{status}</p>
              </div>
             
             
            </div>
            {/**LINHA 5*/}
            <div className="row-pritable">
            <div className="column">
                {" "}
                <div className="column-title">CO-RESPONSÁVEL</div>{" "}
                <p className="content-text">{coordenador}</p>
              </div>
              <div className="column">
                {" "}
                <div className="column-title">SOLCITANTE</div>{" "}
                <p className="content-text">{responsavel}</p>
              </div>
            </div>

            <div className="row-of-images">
              <div>
                <img src={image1} alt="" />
              </div>
              <div>
                <img src={image2} alt="" />
              </div>
            </div>
            <div className="row-of-about">
              <div>
                <p>Última modificação realizada por: {ultimaModificacao}</p>
                <p>
                  {format(horaUltimaModificacao, "dd-MM-yyyy")} as{" "}
                  {format(horaUltimaModificacao, "HH:MM")}
                </p>
              </div>
              <div>
                <p>
                  Av. João Naves de Ávila, 2121, Bloco 5F - Bairro Santa Monica,
                  Uberlândia-MG, CEP:38400-902 Telefone: +55 (34) 3239-9506 -
                  www.ltad.mecanica.ufu.br/ secretarialtad@mecanica.ufu.br{" "}
                </p>
               
              </div>
              <div>
              <p style={{display:"flex", fontSize:12, justifyContent:"end"}}>{format(new Date(), "dd-MM-yyyy HH:MM")}</p>
              </div>
              
            </div>
          </div>
        </div>
        <div className="column"></div>
      </DashboardLayout>
    </AppProvider>
  );
}
