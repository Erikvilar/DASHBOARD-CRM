import { useState } from "react";
import styles from "./LoginDashboard.module.css";
import axios from "axios";

import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-activity";
import { useNavigate } from "react-router-dom";

function LoginDashboard() {
  const [request, setRequest] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate ()
  const nofity = () => toast.success("sucesso ao enviar requisção");
  const error = () => toast.error("Usuario ou senha invalidos");

  const handleRequest = (e) => {
    const { name, value } = e.target;
    setRequest((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const registerSessionUser = async (token)=>{
		await sessionStorage.setItem("JWT", token)
    sessionStorage.setItem('user', request.login)

	


  }

  const sendRequest = async (e) => {

    setLoading(true);
    e.preventDefault();
    const data = {
      login: request.login,
      password: request.password,
    };

    let pathUrl = "http://10.2.128.20:8021/auth/login";

    try {
      const response = await axios.post(pathUrl, data);
      if (response.status == 200) {
    

		nofity();
		registerSessionUser(response.data)
		navigate("viewer")
	


      }
    } catch (e) {
      error();
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className={styles.dashboardLogin}>
      <ToastContainer position="bottom-left" />
      <div className={styles.dashboardView}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYZ3H-SzHOG7Pdjyg-LosOqvhNt7IYVCEsQ&s"
          alt=""
        />
		<span>{!isLogin ? "Faça login na plataforma":"Usuario logado"}</span>
        <form action="" onSubmit={sendRequest}>
          <label htmlFor="">Login:</label>
          <input type="text" name="login" onChange={handleRequest} required />

          <label htmlFor="">Senha</label>
          <input
            type="text"
            name="password"
            value={request.password}
            onChange={handleRequest}
            required
          />
          <button>
            {!loading ? (
              <p>Enviar</p>
            ) : (
              <Bounce color="#727981" size={12} speed={1} animating={true} />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
export default LoginDashboard;
