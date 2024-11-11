import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { PageContainer } from "@toolpad/core";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Descripions() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(true);
  const [data, setData] = useState([]);
  const [editValue, setEditValue] = useState({ new: "", old: "" });

  const handleEdit = (name, value) => {
    setEditValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    const requestGet = async () => {
      const token = sessionStorage.getItem("JWT");
      console.log(token);
      try {
        const urlPath = "http://10.2.128.20:8021/dashboard/descriptions";
        const response = await axios.get(urlPath, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, []);

  return (
    <PageContainer style={{ width: "100%", padding: 0, margin: 0 }}>
      <Box sx={{ height: 700, width: 1500 }}>
        {openDialog && (
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Deseja alterar essa linha?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Açoes feitas nessa linha serão capturadas e arquivadas, valor
                antigo <b>{editValue.old} </b>pelo valor <b>{editValue.new}</b>
                <DialogContentText>Deseja continuar?</DialogContentText>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button onClick={() => setOpenDialog(false)} autoFocus>
                Aceitar
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <DataGrid
          getRowId={(row) => row.id}
          onCellEditStart={(value) => console.log(value.value)}
          onCellClick={(value) => console.log(value)}
          onCellEditStop={() => setOpenDialog(true)}
          processRowUpdate={async (updatedRow, originalRow) => {
            const compare = { updatedRow, originalRow };

            Object.keys(compare.updatedRow).forEach((key) => {
              if (compare.updatedRow[key] !== compare.originalRow[key]) {
                const newValue = compare.updatedRow[key];
                const oldValue = compare.originalRow[key];
                handleEdit("old", oldValue);
                handleEdit("new", newValue);
                console.log(
                  `O valor do campo '${key}' foi alterado: ${newValue}`
                );
              } else {
                return compare.originalRow;
              }
            });
          }}
          columns={[
            { field: "id", headerName: "ID", width: 90, editable: edit },
            {
              field: "modelo",
              headerName: "modelo",
              width: 200,
              editable: edit,
            },
            {
              field: "marca",
              headerName: "marca",
              width: 250,
              editable: edit,
            },
            {
              field: "serie",
              headerName: "serie",
              width: 180,
              editable: edit,
            },
            { field: "descrição", headerName: "descrição", width: 200 },
            {
              field: "localização",
              headerName: "localização",
              width: 150,
              editable: edit,
            }
     
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
      </Box>
    </PageContainer>
  );
}
