import { useState } from "react";
import styles from "./styles.module.css";
import { GrStatusGood } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-activity";
import { useNavigate } from "react-router-dom";
import axiosGeneralRequest from "../../../services/ApiServiceRequests";


function Login() {
  const [request, setRequest] = useState({ login: "", password: ""});
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const nofity = () => toast.success("sucesso ao enviar requisção");
  const error = () => toast.error("Usuario ou senha invalidos");

  const handleRequest = (e) => {
    const { name, value } = e.target;
    setRequest((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerSessionUser = async (data) => {
 
    const {token, avatar, login} = data;
     sessionStorage.setItem("JWT", token);
    sessionStorage.setItem("user", login);
    sessionStorage.setItem("avatar", avatar)

  };

  const sendRequest = async (e) => {
    e.preventDefault();
    const data = {
      login: request.login,
      password: request.password,
    };

  

    try {
   
      const response = await axiosGeneralRequest.login(data, { timeout: 5000 });
      if (response.status == 202) {
     
        setIsLogin(true)
        nofity();
        registerSessionUser(response.data);
        setTimeout(()=> navigate("viewer"), 2000)
      
      }
    } catch (e) {
      error();
    } finally {
     
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.dashboardLogin}>
        <ToastContainer position="bottom-left" />
        <div className={styles.dashboardView}>
          <div className={styles.dashboardImage}>
            <img src="src\images\Logo\DATAFLUX.png" alt="" height={450} />
          </div>
          <form action="" onSubmit={sendRequest}>
            <div>
              <h2>{!isLogin ? (<span>Fazer Login <FaUser/></span>) : (<span>Usuario logado  <GrStatusGood/></span>)}</h2>
            </div>

            <label htmlFor="">Login:</label>
            <input type="text" name="login" onChange={handleRequest} placeholder="example" required />
            <label htmlFor="">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={request.password}
              onChange={handleRequest}
              required
            />
            <button style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              {!isLogin ? (
               <span>Entrar</span>
              ) : (
                <Bounce color="#727981" size={12} speed={1} animating={true} />
              )}
            </button>
          </form>
          <div className={styles.about}>
            <a href="">Preciso de ajuda</a>
            <a href="">Contate-nos</a>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
