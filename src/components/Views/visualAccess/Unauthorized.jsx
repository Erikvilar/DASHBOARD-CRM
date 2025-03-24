export const Unauthorized = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "#eeeeee",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "60%",
          padding: 20,
          borderRadius: 15,
          boxShadow: "0px 0px 15px 0px white",
        }}
      >
        <h1 style={{ padding: 20, color:"black"}}>
          Você não possui privilegios nescessarios para acessar essa página.
        </h1>
        <img
          src="./src/images/access_icons/unauthorized.png"
          width="30%"
          alt="unauthorized"
        />
        <p style={{color:"black"}}>Contate o administrador para redefinir seu acesso</p>
      </div>
    </div>
  );
};
export default Unauthorized;