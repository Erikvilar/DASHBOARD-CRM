import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { GrStatusGood } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-activity";
import { useNavigate } from "react-router-dom";
import axiosGeneralRequest from "../../../services/apiServiceRequests";
import Swal from "sweetalert2";
import softwareAbout from "../../../manifest";

function Login() {
  const [request, setRequest] = useState({ login: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const error = () => toast.error("Usuario ou senha invalidos");
  const warn = () => toast.warn("Este usuario já possui uma sessão ativa.");


  const sendRequest = async (e) => {
    e.preventDefault();
    const data = {
      login: request.login.trim().toLowerCase(),
      password: request.password.trim(),
    };

    try {
      const response = await axiosGeneralRequest.login(data, { timeout: 5000 });
      if (response.status == 202) {
        setIsLogin(true);
        Swal.fire({
          title: "Login em progresso",
          text: "Aguarde, estamos te autenticando no sistema...",
          timer: 3000, 
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          registerSessionUser(response.data);
          navigate("viewer");
        });
  
      
      }
     
    } catch (error) {
      if(error.response?.status == 409){
        Swal.fire({
          title: "Esta conta já está acessada em outro dispositivo",
          text: "Caso esteja enfrentando problemas com login favor reporte ao administrador do sistema.",
          confirmButtonText:"OK",
          confirmButtonColor:"blue",
          allowOutsideClick: false,
          
        }).then((result)=>{
          if(result.isConfirmed){
            Swal.close();
          }
        });
      }else if(error.response?.status == 403){
        Swal.fire({
          title: "Sistema esta enfrentando alguns problemas técnicos.",
          text: "Caso esteja enfrentando problemas com login favor reporte ao administrador do sistema.",
          confirmButtonColor:"green",
          confirmButtonText:"OK",
          allowOutsideClick: false,
          
        }).then((result)=>{
          if(result.isConfirmed){
            Swal.close();
          }
        });
      }else if(error.response?.status == 401){
        Swal.fire({
          title: "Usuario ou senha incorreta",
          text: "Tente novamente ou peça ao administrador para resetar sua senha.",
          confirmButtonColor:"grey",
          confirmButtonText:"Entendido",
          allowOutsideClick: false,
          
        }).then((result)=>{
          if(result.isConfirmed){
            Swal.close();
          }
        });
      }

      console.log(error);
    }
  };

  const handleRequest = (e) => {
    const { name, value } = e.target;
    setRequest((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const userLogged = JSON.parse(localStorage.getItem("isLogged") || "false");
  useEffect(() => {
    if (userLogged) {
      navigate("viewer");
    }
  }, [userLogged]);


  const registerSessionUser = async (data) => {
    const { token, avatar, login, role, isLogged } = data;

    localStorage.setItem("JWT", token);
    localStorage.setItem("user", login);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("role", role);
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
  };



 
  return (
    <div className={styles.background}>
      <section className={styles.dashboardLogin}>
        <ToastContainer position="bottom-left" />
        <div className={styles.dashboardView}>
          <div className={styles.dashboard}>
            <img
              src="https://github.com/Erikvilar/DASHBOARD-CRM/blob/production/src/images/Logo/DATAFLUX.png?raw=true"
              alt="Imagem logo empresa principal"
            />
            <img
              src="https://github.com/Erikvilar/DASHBOARD-CRM/blob/production/src/images/Logo/ltadLogo.png?raw=true"
              alt="imagem logo laboratorio"
            />
       

            <form
              className={styles.formDashboard}
              action=""
              onSubmit={sendRequest}
            >
              <h2>
                {!isLogin ? (
                  <span>
                    Fazer Login <FaUser />
                  </span>
                ) : (
                  <span>
                    Usuario logado <GrStatusGood />
                  </span>
                )}
              </h2>

              <label htmlFor="">Login:</label>
              <input
                style={{backgroundColor:"white", color:"cornflowerblue"}}
                type="text"
                name="login"
                onChange={handleRequest}
                placeholder="John Doe"
                required
              />
              <label htmlFor="">Senha</label>
              <input
               style={{backgroundColor:"white", color:"cornflowerblue"}}
                type="password"
                name="password"
                placeholder="********"
                value={request.password}
                onChange={handleRequest}
                required
              />
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!isLogin ? (
                  <span>Entrar</span>
                ) : (
                  <Bounce
                    color="#727981"
                    size={12}
                    speed={1}
                    animating={true}
                  />
                )}
              </button>
              
            </form>
            <div className={styles.about}>

              <div>
              <a href="">Preciso de ajuda</a>
              <a href="mailto:erik.alves@ltad.com.br">Contate-nos</a>
              <a style={{color:"#0950ad"}}>v.{softwareAbout.version()}</a>
              </div>
                
            </div>
            <div className={styles.about}>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
