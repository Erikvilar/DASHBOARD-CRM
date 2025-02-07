import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import General from "../Dashboard_sections/Gerenciamento/Produtos/General";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import ProjetosView from "../Dashboard_sections/Gerenciamento/projetos/ProjetosView";
import { desconectWebSocket } from "../../../../services/ConnectionWebsocket";
import { IoIosPeople } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { GeneralFormModal } from "../Dashboard_sections/Gerenciamento/Produtos";
import CadResponsaveis from "../../../modals/GeneralFormModal/CadResponsaveis";



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
  const logout = () => toast.info("usuario fez logout");

  const renderBasePathName = () => {
    switch (router.pathname) {
      case "/gerenciamento/produtos":
        return <General />;
      case "/cadastro/cadastroItens":
        return <GeneralFormModal/>
      case "/cadastro/CadastroResponsaveis":
        return sessionStorage.getItem("role") == "USER" ?toast.error("nao autorizado") : <CadResponsaveis/>
      case "/gerenciamento/projetos/MFLD":
        return  <ProjetosView projectName={"MFLD"} />;
      case "/gerenciamento/projetos/LIGAS":
        return   <ProjetosView projectName={"LIGAS"} />;
      case "/gerenciamento/projetos/TECHNIP":
        return <ProjetosView projectName={"TECHNIP"} />;
      case "/gerenciamento/projetos/LZENERGIA":
        return  <ProjetosView projectName="LZENERGIA" />;

      case "/reports/traffic":
        return <div>Conteúdo de Traffic</div>;
      default:
        return <div>Conteúdo Padrão</div>;
    }
  };

  const [session, setSession] = React.useState({
    user: {
      name: sessionStorage.getItem("user"),
      email: `${sessionStorage.getItem("user")}@ltad.com`,
      image: sessionStorage.getItem("avatar"),
    },
  });

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
        setSession(null);
        sessionStorage.setItem("JWT", "");
      },
    };
  }, []);




  if (sessionStorage.getItem("JWT") == "") {
    logout();
    desconectWebSocket();
    setTimeout(() => navigate("/"), 2000);
  }

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
              title: "Patrimonios",
              icon: <InventoryIcon  />,
            },
          
            {
              segment: "projetos",
              title: "Relatório de projetos",
              icon: <ContentPasteIcon />,
              children:[
                {
                  segment:"MFLD",
                  title:"MFLD",
                  icon: <DescriptionIcon />
                },
                {
                  segment:"LIGAS",
                  title:"LIGAS",
                  icon: <DescriptionIcon />
                },
                {
                  segment:"TECHNIP",
                  title:"TECHNIP",
                  icon: <DescriptionIcon />
                },
                {
                  segment:"LZENERGIA",
                  title:"LZ ENERGIA",
                  icon: <DescriptionIcon />
                },
              ],
            },
          ],
        },
        {
          kind: "header",
          title: "Cadastros",
        },
        {
        segment: "cadastro",
        title: "Cadastros",
        icon: <AddCircleIcon size={24} />,
        children: [
          {
            segment: "cadastroItens",
            title: "Adicionar itens",
            icon: <AiFillProduct size={24} />,
          },
          {
            segment: "CadastroResponsaveis",
            title: "Registrar responsáveis",
            icon: <IoIosPeople size={24} style={{color:"gray"}}/>,
            
        
          },
        ]
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
          <img src="src\images\Logo\sm_icon_dataflux3.png" alt="MUI logo" />
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
