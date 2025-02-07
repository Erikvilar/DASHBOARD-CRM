import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Dialogs({open,close, newValue, oldValue, handleY, handleN}){

      const handleKey = (e)=>{
        if(e.key === "Enter"){
          handleY()
        }
      }
      console.log("teste"+newValue)
      console.log("teste"+oldValue)
    return (
        <Dialog
        open={open}
        onKeyDown={handleKey}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja alterar essa linha?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Açoes feitas nessa linha serão capturadas e arquivadas, valor
            antigo <b>{oldValue} </b>pelo valor <b>{newValue}</b>
            <DialogContentText>Deseja continuar?</DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleN}>Cancelar</Button>
          <Button onClick={handleY}>Aceitar</Button>
        </DialogActions>
      </Dialog>
    )
}