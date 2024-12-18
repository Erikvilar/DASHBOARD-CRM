import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import General from "./Dashboard_sections/patrimonios/General_data/General";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import Descripions from "./Dashboard_sections/patrimonios/Descriptions";
import Projects from "./Dashboard_sections/patrimonios/Projects";



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
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;
  const router = useDemoRouter();
  const navigate = useNavigate();
  const logout = () => toast.info("usuario fez logout")
  const renderContent = () => {
    // Navegação condicional baseada no pathname atual
    switch (router.pathname) {
      case "/patrimonio/general":
        return <General/>;
      case "/patrimonio/descricoes":
        return <Descripions/>
      case "/patrimonio/projetos":
        return <Projects/>
      case "/reports/traffic":
        return <div>Conteúdo de Traffic</div>;
      default:
        return <div>Conteúdo Padrão</div>;
    }
  };



  const [session, setSession] = React.useState({
    
    user: {
      name: sessionStorage.getItem('user'),
      email: `${sessionStorage.getItem('user')}@ltad.com`,
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
      logout()
      setTimeout( ()=> navigate("/"), 2000)
 
  }

  return (
    <AppProvider
      navigation={[
        {
          kind: "header",
          title: "Gerenciamento",
        },
        {
          segment: "patrimonio",
          title: "Gerenciamento",
          icon: <DashboardIcon />,
          children: [
            {
              segment: "general",
              title: "Produtos",
              icon: <DescriptionIcon />,
            },
        
         
            {
              segment: "Relatorios",
              title: "Relatorios",
              icon: <DescriptionIcon />,
            },
          ],
        },
        {
          segment: "orders",
          title: "Orders",
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
        logo: <img src="src\images\Logo\sm_icon_dataflux3.png" alt="MUI logo" />,
        title: "DASHBOARD",
        
      }}
      session={session}
      authentication={authentication}
      theme={demoTheme}
      window={demoWindow}
    
    >
      <ToastContainer limit={1}   autoClose={3000} position="bottom-left" />
      
      <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
  );
}
