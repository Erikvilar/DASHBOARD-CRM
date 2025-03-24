import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Dialogs({open,close,  handleY, handleN}){
      const oldValue = sessionStorage.getItem('oldRowValue')
      const newValue = sessionStorage.getItem('newRowValue')
      const handleKey = (e)=>{
        if(e.key === "Enter"){
          handleY()
        }
      }

    return (
        <Dialog
        open={open}
        onKeyDown={handleKey}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Esta linha será alterada deseja continuar?"}
        </DialogTitle>
     <DialogActions>
          <Button onClick={handleN}>Cancelar</Button>
          <Button onClick={handleY}>Aceitar</Button>
        </DialogActions>
      </Dialog>
    )
}