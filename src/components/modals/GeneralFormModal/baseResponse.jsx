const baseResponse = (response)=>{
  const data ={

        itemsDTO: {
          nf_invoice_item: response.itemsDTO.nfInvoice,
          codigo_item: response.itemsDTO.codigo_item,
          observacao_item: response.itemsDTO.observacao_item,
          caminho_imagem_item: response.itemsDTO.caminho_imagem_item,
          pedido_origem: response.pedido_origem,
          sde_item: response.sde_item,
          status_item: response.status_item,
          valor_item: response.valor_item,
          lastModify: sessionStorage.getItem("user"),
          updateIn: response.updateIn,
        },
        usersDTO: {
          nome_usuario: response.nome_usuario,
          tipo_usuario: response.tipo_usuario,
        },
        detailsDTO: {
          marca_descricao: response.marca_descricao,
          descricao_item: response.descricao_item,
          localizacao_descricao: response.localizacao_descricao,
          modelo_descricao: response.modelo_descricao,
          serie_descricao: response.serie_descricao,
        },
        costCenterDTO: {
          nome_centro_custo: response.nome_centro_custo,
          identificacao_centro_custo: response.identificacao_centro_custo,
          data_inicio_centro_custo: response.data_inicio_centro_custo,
          data_fim_centro_custo: response.data_fim_centro_custo,
        },
        contactsDTO: {
          email_contato: response.email_contato,
          ocupacao_contato: response.ocupacao_contato,
          telefone_contatos: response.telefone_contato,
        },
        receivingDTO: {
          termo:response.receivingDTO.termo,
          local: response.receivingDTO.local,
          lotação: response.receivingDTO.lotação,
          empSIAFI: response.receivingDTO.empSIAFI,
        
        },
    }
    return data;
}
export default baseResponse;