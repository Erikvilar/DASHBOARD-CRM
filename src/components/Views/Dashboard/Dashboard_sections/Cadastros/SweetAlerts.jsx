import Swal from "sweetalert2";

const sweetAlerts = {
  deleteAlert: async () => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning", // Ícone de alerta ⚠️
      showCancelButton: true, // Exibe botão de cancelar
      confirmButtonColor: "#d33", // Cor do botão "Sim"
      cancelButtonColor: "#3085d6", // Cor do botão "Não"
      confirmButtonText: "Sim, deletar!", // Texto do botão de confirmação
      cancelButtonText: "Cancelar", // Texto do botão de cancelamento
      showDenyButton: true, // Exibe botão "Não"
      denyButtonText: "Manter", // Texto do botão de negação
      backdrop: `rgba(0,0,0,0.5)`, // Fundo escuro para efeito mais dramático
      timer: 8000, // Fecha automaticamente após 8 segundos
      timerProgressBar: true, // Adiciona barra de tempo
      allowOutsideClick: false, // Bloqueia clique fora do modal
      allowEscapeKey: false, // Bloqueia fechar com "Esc"
      allowEnterKey: true, // Permite fechar com "Enter"
      customClass: {
        popup: "my-popup-class", // Personalização CSS (opcional)
      },
    });

    if (result.isConfirmed) {
      return true;
    } else if (result.isDenied) {
      return false;
    }

    return null;
  },

  submitAlert: async () => {
    const result = await Swal.fire({
      title: "Confirme esta ação",
      text: "Verifique se os dados inseridos estão obdecendo as regras propostas, lembrando não e permitido campos nulos ou vazios",
      icon: "warning", // Ícone de alerta ⚠️
      showCancelButton: true, // Exibe botão de cancelar
      confirmButtonColor: "green", // Cor do botão "Sim"
      cancelButtonColor: "red", // Cor do botão "Não"
      confirmButtonText: "Sim, desejo salvar", // Texto do botão de confirmação
      cancelButtonText: "Cancelar", // Texto do botão de cancelamento
      showDenyButton: true, // Exibe botão "Não"
      denyButtonText: "Manter",
      denyButtonColor:"gray", // Texto do botão de negação
      backdrop: `rgba(0,0,0,0.5)`, // Fundo escuro para efeito mais dramático
      timerProgressBar: true, // Adiciona barra de tempo
      allowOutsideClick: false, // Bloqueia clique fora do modal
      allowEscapeKey: false, // Bloqueia fechar com "Esc"
      allowEnterKey: true, // Permite fechar com "Enter"
      customClass: {
        popup: "my-popup-class", // Personalização CSS (opcional)
      },
    });

    if (result.isConfirmed) {
      return true;
    } else if (result.isDenied) {
      return false;
    }

    return null;
  },
  notAuthorized: async () => {
    const result = await Swal.fire({
      title: "Confirme esta ação",
      text: "Você não está autorizado a acessar esse conteudo",
      icon: "warning", // Ícone de alerta ⚠️
      showCancelButton: true, // Exibe botão de cancelar
      confirmButtonColor: "green", // Cor do botão "Sim"
      cancelButtonColor: "red", // Cor do botão "Não"
      confirmButtonText: "Sim, desejo salvar", // Texto do botão de confirmação
      cancelButtonText: "Cancelar", // Texto do botão de cancelamento
      showDenyButton: true, // Exibe botão "Não"
      denyButtonText: "Manter",
      denyButtonColor:"gray", // Texto do botão de negação
      backdrop: `rgba(0,0,0,0.5)`, // Fundo escuro para efeito mais dramático
      timerProgressBar: true, // Adiciona barra de tempo
      allowOutsideClick: false, // Bloqueia clique fora do modal
      allowEscapeKey: false, // Bloqueia fechar com "Esc"
      allowEnterKey: true, // Permite fechar com "Enter"
      customClass: {
        popup: "my-popup-class", // Personalização CSS (opcional)
      },
    });
  },
  
};

export default sweetAlerts;
