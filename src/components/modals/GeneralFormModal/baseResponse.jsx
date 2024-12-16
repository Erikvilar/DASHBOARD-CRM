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
          id_descricao: response.id_descricao,
          marca_descricao: response.marca_descricao,
          descricao_item: response.descricao_item,
          localizacao_descricao: response.localizacao_descricao,
          modelo_descricao: response.modelo_descricao,
          serie_descricao: response.serie_descricao,
        },
        costCenterDTO: {
          id_centro_custo: response.id_centro_custo,
          nome_centro_custo: response.nome_centro_custo,
          identificacao_centro_custo: response.identificacao_centro_custo,
          data_inicio_centro_custo: response.data_inicio_centro_custo,
          data_fim_centro_custo: response.data_fim_centro_custo,
        },
        contactsDTO: {
          id_contato: response.id_contato,
          email_contato: response.email_contato,
          ocupacao_contato: response.ocupacao_contato,
          telefone_contatos: response.telefone_contato,
        },
        receivingDTO: {
          id_recebimento: null,
          local: null,
          lotação: null,
          empSIAFI: null,
          termo: null,
        },
    }
    return data;
}
export default baseResponse;