
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosGeneralRequest } from "../produtos"; 
import { MdAttachMoney } from "react-icons/md";
import { PageContainer,  } from "@toolpad/core";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
export default function ProjetosView({ projectName }) {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  let token = sessionStorage.getItem("JWT");
  useEffect(() => {
    const requestGet = async () => {
      try {
        const response = await axiosGeneralRequest.project(projectName, token);
        if (response.status == 200) {
          console.log("registro OK");
          setData(response.data);
        }
      } catch (e) {
        toast.error("Identificado acesso não autorizado");
        setTimeout(() => navigate("/"), 5500);
      }
    };
    console.log(data);
    requestGet();
    const interval = setInterval(() => {
      requestGet();
    }, 5000);

    return () => clearInterval(interval);
  }, [projectName]); 

  return (
    <PageContainer  title={"Relatorio "+projectName}>

    <div style={{display:"flex", alignItems:"center", backgroundColor:"yellow", justifyContent:"end"}}>
        <span >Valor total:</span> 
        {(<MdAttachMoney size={24} color="green"/>)}{data.total}
    </div>
  <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          style={{ width: "100%", height: "100%" }}
          getRowId={(row) => row.id}
          onCellEditStart={(value) => console.log(value.value)}
          rows={data.items}
          columns={[
            {
                field: "number",
                headerName: "Patrimonio",
                width: 120,
                editable: false,
              },
            {
                field: "description",
                headerName: "Item",
                width: 120,
                editable: false,
              },
            {
                field: "description",
                headerName: "Item",
                width: 120,
                editable: false,
              },
            {
                field: "description",
                headerName: "Item",
                width: 120,
                editable: false,
              },
            {
                field: "description",
                headerName: "Item",
                width: 120,
                editable: false,
              },
            {
                field: "identification",
                headerName: "Projeto",
                width: 120,
                editable: false,
              },
            {
                field: "number",
                headerName: "Patrimonio",
                width: 120,
                editable: false,
              },
            {
                field: "number",
                headerName: "Patrimonio",
                width: 120,
                editable: false,
              },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[1]}
        />
       </PageContainer>
    );
}
