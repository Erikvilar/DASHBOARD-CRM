import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const Responsaveis = ()=>{
    const [formData, setFormData] = useState({
        nome_usuario: "",
        tipo_usuario: "",
        email_usuario: "",
        telefone_usuario: ""
      });
    
      // Função para capturar os valores dos campos
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Função para enviar os dados ao backend
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("https://seu-backend.com/api/users", formData);
          console.log("Sucesso:", response.data);
        } catch (error) {
          console.error("Erro ao enviar os dados:", error);
        }
      };
    
      return (
        <><div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          marginBottom: 10,
        }}
      >
        <h3
          style={{
            color: "white",
            width: "60%",
            padding: 20,
            textAlign: "left",
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: "bold",
          }}
        >
         Cadastrar responsáveis imediatos
       
        </h3>
      </div>
        <Form onSubmit={handleSubmit} className="p-3 border rounded">
          <Form.Group className="mb-3">
            <Form.Label>Nome e sobrenome</Form.Label>
            <Form.Control
              type="text"
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Ocupação</Form.Label>
            <Form.Control
              type="text"
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email_usuario"
              value={formData.email_usuario}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              name="telefone_usuario"
              value={formData.telefone_usuario}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Button variant="primary" type="submit" disabled>
            Enviar
          </Button>
        </Form>
        </>
      );
}
export default Responsaveis;