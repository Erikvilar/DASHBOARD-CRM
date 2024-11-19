import { Box, Button, Input, Modal } from "@mui/material";
import module from "./GeneralFormModal.module.css";
import { toast, ToastContainer } from "react-toastify";
import { Label } from "@mui/icons-material";
export default function GeneralFormModal({ open, close, handleClose }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    
    p: 5,
  };
  const handleSubmit = () => toast.success("dados enviados");
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style}
     
      >
        <Box className={module.boxTitleLogo}>
          <h1>Adicionar novos items</h1>
          <img
            src="src\images\Logo\DATAFLUX.png"
            alt=""
            width={200}
            style={{ position: "fixed", top: -60, left: 0, padding: 10 }}
          />
        </Box>
        <form
        className={module.formData}
          style={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            margin: "auto",
          }}
        >
          <div style={{display:"flex",alignItems:"center",paddingTop:10, paddingBottom:10}}>Dados dos usuarios <Label/></div>
          <Input placeholder="Responsavel" />
          <Input placeholder="Ocupação ou cargo" />
          <Input placeholder="Telefone" />
          <Input placeholder="Email" />

          <div style={{display:"flex",alignItems:"center",paddingTop:10, paddingBottom:10}}>Dados do item<Label/></div>
          <Input placeholder="Codigo do item" />
          <Input placeholder="Descrição detalhada do item" />
          <Input placeholder="Localização do item" />
          <Input placeholder="Status do item" />
          <div style={{display:"flex",alignItems:"center",paddingTop:10, paddingBottom:10}}>Dados fincanceiros<Label/></div>
          <Input placeholder="Numero de nota fiscal ou invoice caso exista" />
          <Input placeholder="Valor unitario" label="Outlined" required type="number" />
          <Input placeholder="Número de SDE pedido de origem" type="number"/>
          <div style={{display:"flex",alignItems:"center",paddingTop:10, paddingBottom:10}}>Dados do centro de custo<Label/></div>
          <Input placeholder="Nome do projeto" />
          <Input placeholder="Sigla de identificação interna" />
          <label htmlFor="" style={{textAlign:"start"}}>Data de inicio</label>
          <Input placeholder="Data de inicio do projeto" type="date"/>
          <label htmlFor="" style={{textAlign:"start"}}>Data de fim</label>
          <Input placeholder="Data do fim do projeto" type="date" />
          <Input placeholder="Modelo do item" />
          <Input placeholder="Valor unitario" label="Outlined" required type="number" />
         
        </form>
        <div className={module.boxButtons}>
          <Button
            variant="text"
            onClick={handleClose}
            style={{ backgroundColor: "orange" }}
          >
            Cancelar
          </Button>
          <Button
            variant="text"
            onClick={handleSubmit}
            style={{ backgroundColor: "yellowgreen" }}
          >
            Salvar
          </Button>
        </div>
        <ToastContainer position="top-right" />
      </Box>
    </Modal>
  );
}
