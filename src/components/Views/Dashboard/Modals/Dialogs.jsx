import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Dialogs({ enable, onClose }) {
  const [open, setOpen] = useState(enable);

  useEffect(() => {
    setOpen(enable);
  }, [enable]);

  const handleClose = (result) => {
    setOpen(false);
    onClose(result)

  };
  return (
    <Dialog
      open={open}
      onClose={()=> handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja alterar essa linha?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Açoes feitas nessa linha serão capturadas e arquivadas,
            <DialogContentText>Deseja continuar?</DialogContentText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=> handleClose(false)}>Cancelar</Button>
        <Button onClick={()=> handleClose(true)} autoFocus>
          Aceitar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
