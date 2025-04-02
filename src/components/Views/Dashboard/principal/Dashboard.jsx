import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import General from "../Dashboard_sections/Gerenciamento/produtos/General";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ProjetosView from "../Dashboard_sections/Gerenciamento/projetos/ProjetosView";
import { AiFillProduct } from "react-icons/ai";
import CadastrarItems from "../Dashboard_sections/Cadastros/CadastrarItems";
import { axios, axiosGeneralRequest } from "../Dashboard_sections/Cadastros";
import CadastroPessoal from "../Dashboard_sections/Cadastros/CadastroPessoal";
import Swal from "sweetalert2";
import Arquivos from "../Dashboard_sections/Cadastros/Arquivos";

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "data",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function Dashboard(props) {
  const { window } = props;
  const demoWindow = window ? window() : undefined;
  const router = useDemoRouter();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("JWT");
  const user = localStorage.getItem("user");
  const renderBasePathName = () => {
    switch (router.pathname) {
      case "/gerenciamento":
        return <General />;
      case "/gerenciamento/produtos":
        return <General />;

      case "/cadastro/Items":
        return <CadastrarItems role={role} />;
      case "/cadastro/pessoas":
        return <CadastroPessoal role={role} />;
      case "/cadastro/arquivos":
        return <Arquivos/>

      case "/gerenciamento/projetos/MFLD":
        return <ProjetosView projectName={"CHARPINF"} />;
      case "/gerenciamento/projetos/LIGAS":
        return <ProjetosView projectName={"LIGAS"} />;
      case "/gerenciamento/projetos/TECHNIP":
        return <ProjetosView projectName={"TECHNIP"} />;
      case "/gerenciamento/projetos/LZENERGIA":
        return <ProjetosView projectName="LZENERGIA" />;

      case "/reports/traffic":
        return <div>Conteúdo de Traffic</div>;
      default:
        return <General />;
    }
  };

  const [session, setSession] = React.useState({
    user: {
      name: localStorage.getItem("user"),
      email: `${localStorage.getItem("user")}@ltad.com`,
      image: localStorage.getItem("avatar"),
    },
  });

  const logoutMethod = async(user)=>{
    const data={
      login:user
    }
    const response = await axiosGeneralRequest.logout(data)
    if(response.status == 200){
      console.log(response.data.isLogged)
      localStorage.setItem("isLogged",response.data.isLogged)
      console.log("usuario deslogado");
    }
  }

  const logoutModal = () => {
    Swal.fire({
      title: "Encerrando sua sessão aguarde",
      text: "Estamos te desconetando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setTimeout(async() => {
      await logoutMethod(user)
      localStorage.removeItem("JWT");
      navigate("/");
      Swal.close()
    }, 3000);
  };
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          },
        });
      },
      signOut: () => {
    logoutModal();
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={[
        {
          kind: "header",
          title: "Gerenciamento",
        },

        {
          segment: "gerenciamento",
          title: "Gerenciamento",
          icon: <DashboardIcon />,

          children: [
            {
              segment: "produtos",
              title: "Equipamentos",
              icon: <InventoryIcon />,
            },

            
          ],
        },
        {
          kind: "header",
          title: "Cadastros",
        },
        //cadastro

        {
          segment: "cadastro",
          title: "Cadastros",
          icon: <AddCircleIcon size={24} />,

          children: [
            {
              segment: "Items",
              title: "Equipamentos",
              icon: <AiFillProduct size={24} />,
            },
            {
              segment: "pessoas",
              title: "Registrar pessoas",
              icon: <AiFillProduct size={24} />,
            },
          
            {
              segment: "arquivos",
              title: "Arquivos",
              icon: <AiFillProduct size={24} />,
            },
          ],
        },

        {
          kind: "divider",
        },
        {
          kind: "header",
          title: "Compras",
        },
        {
          segment: "SDE",
          title: "SDE",
          icon: <ShoppingCartIcon />,
        },

        {
          kind: "divider",
        },
        {
          kind: "header",
          title: "Analytics",
        },
        {
          segment: "reports",
          title: "Reports",
          icon: <BarChartIcon />,
          children: [
            {
              segment: "sales",
              title: "Sales",
              icon: <DescriptionIcon />,
            },
            {
              segment: "traffic",
              title: "Traffic",
              icon: <DescriptionIcon />,
            },
          ],
        },
        {
          segment: "integrations",
          title: "Integrations",
          icon: <LayersIcon />,
        },
      ]}
      router={router}
      branding={{
        logo: (
          <img
            src="https://github.com/Erikvilar/DASHBOARD-CRM/blob/main/src/images/Logo/sm_icon_dataflux.png?raw=true"
            alt="MUI logo"
          />
        ),
        title: "Dashboard",
      }}
      session={session}
      authentication={authentication}
      theme={demoTheme}
      window={demoWindow}
    >
      <ToastContainer limit={1} autoClose={3000} position="bottom-left" />

      <DashboardLayout>{renderBasePathName()}</DashboardLayout>
    </AppProvider>
  );
}
