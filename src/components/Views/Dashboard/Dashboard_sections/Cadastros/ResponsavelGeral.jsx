import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const ResponsavelGeral = ()=>{
    const [formData, setFormData] = useState({
        nome_responsavel_geral: "",
        ocupacao_responsavel: "",
        email_responsavel_geral: "",
        telefone_responsavel_geral: ""
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
          const response = await axios.post("https://seu-backend.com/api/responsaveis", formData);
          console.log("Sucesso:", response.data);
        } catch (error) {
          console.error("Erro ao enviar os dados:", error);
        }
      };
    
      return (
        <>
        <div
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
          Cadastrar coordenador
       
        </h3>
      </div>
        <Form onSubmit={handleSubmit} className="p-3 border rounded">
          <Form.Group className="mb-3">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              name="nome_responsavel_geral"
              value={formData.nome_responsavel_geral}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Ocupação</Form.Label>
            <Form.Control
              type="text"
              name="ocupacao_responsavel"
              value={formData.ocupacao_responsavel}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email_responsavel_geral"
              value={formData.email_responsavel_geral}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              name="telefone_responsavel_geral"
              value={formData.telefone_responsavel_geral}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
        </>
      );
    
}
export default ResponsavelGeral;