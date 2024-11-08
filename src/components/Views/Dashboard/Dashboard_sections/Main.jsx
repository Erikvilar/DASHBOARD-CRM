import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Dialogs from "../Modals/Dialogs";
import { PageContainer } from "@toolpad/core";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




  



export default function Main() {

  const [editable, setEditable] = useState(false);
  const navigate = useNavigate()
 
 
  const [data, setData] = useState([])
  useEffect(()=>{
    const requestGet = async()=>{
        const token = sessionStorage.getItem('JWT')
    console.log(token)
     try {    
       const urlPath = "http://10.2.128.20:8021/dashboard/showAll";
       const response = await axios.get(urlPath, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       if (response.status == 200) {
        console.log("registro OK")
     
        setData(response.data)

       }
     } catch (e) {
       toast.error("Identificado acesso não autorizado")
       setTimeout(()=> navigate("/"), 5500)
     }
    }
  requestGet()
 },[])

  const handleDialogOpen = () => {
    setEditable(true);
  };
  const handleEditableClose = () => {
    setEditable(false);
  };
  console.log(editable);

  return (
    <PageContainer style={{ width: "100%", padding: 0, margin: 0 }}>
      <Box sx={{ height: 700, width: 1500 }}>
        {editable && <Dialogs enable={editable} onClose={setEditable} />}
        <ToastContainer/>
        <DataGrid getRowId={(row) => row.id}
          onCellDoubleClick={handleDialogOpen}
          onCellEditStop={handleEditableClose}
      
          columns={[
            { field: 'id', headerName: 'ID', width: 90,editable:editable },
            { field: 'patrimonio', headerName: 'Patrimônio', width: 150,editable:editable },
            { field: 'observação', headerName: 'Observação', width: 250 ,editable:editable},
            { field: 'imagem', headerName: 'Imagem', width: 180,editable:editable },
            { field: 'SDE', headerName: 'SDE', width: 100 },
            { field: 'NF_INVOICE', headerName: 'NF Invoice', width: 150,editable:editable },
            { field: 'pedido', headerName: 'Pedido', width: 150,editable:editable },
            { field: 'status', headerName: 'Status', width: 150 ,editable:editable},
            { field: 'valor', headerName: 'Valor', width: 120,editable:editable },
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
