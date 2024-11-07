import { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


import Dialogs from '../Modals/Dialogs';
import { PageContainer } from '@toolpad/core';



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14},
  { id: 2, lastName: 'Snow', firstName: 'Jon', age: 14},

];



export default function Main(){
    const  [editable, setEditable] = useState(false)
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: editable        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: editable,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: editable,
        },
       
      ];
      const handleDialogOpen = ()=>{
        setEditable(true)
      }
      const handleEditableClose = ()=>{
        setEditable(false)
      }
console.log(editable)
    return (
        <PageContainer style={{width:'100%', padding:0, margin:0}}>
            
    <Box sx={{ height: 800, width:'100%' }}>
        {editable && <Dialogs enable={editable} onClose={setEditable}/>}
    <DataGrid
    
    onCellDoubleClick={handleDialogOpen}
    onCellEditStop={handleEditableClose}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 2,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
      
  </Box>
  </PageContainer>
);
}