import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-activity";
import { useNavigate } from "react-router-dom";

function Login() {
  const [request, setRequest] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
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

  const registerSessionUser = async (token) => {
    await sessionStorage.setItem("JWT", token);
    sessionStorage.setItem("user", request.login);
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    const data = {
      login: request.login,
      password: request.password,
    };

    let pathUrl = "http://10.2.128.20:8021/auth/login";

    try {
      setLoading(true);
      const response = await axios.post(pathUrl, data, { timeout: 5000 });
      if (response.status == 200) {
        nofity();
        registerSessionUser(response.data);
        navigate("viewer");
      }
    } catch (e) {
      error();
    } finally {
      setLoading(false);
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
              <h2>{!isLogin ? "Àrea de login" : "Usuario logado"}</h2>
            </div>

            <label htmlFor="">Login:</label>
            <input type="text" name="login" onChange={handleRequest} required />
            <label htmlFor="">Senha</label>
            <input
              type="password"
              name="password"
              value={request.password}
              onChange={handleRequest}
              required
            />
            <button>
              {!loading ? (
                <p>Entrar</p>
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
