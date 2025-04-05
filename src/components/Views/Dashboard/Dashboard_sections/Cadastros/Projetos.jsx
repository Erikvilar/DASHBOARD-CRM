
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Projetos = ()=>{
    const [formData, setFormData] = useState({
        nome_centro_custo: "",
        identificacao_centro_custo: "",
        data_inicio_centro_custo: "",
        data_fim_centro_custo: ""
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
          const response = await axios.post("https://seu-backend.com/api/cost-center", formData);
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
    Cadastrar projetos
 
  </h3>
</div>
        <Form onSubmit={handleSubmit} className="p-3 border rounded">
          <Form.Group className="mb-3">
            <Form.Label>Sigla do projeto</Form.Label>
            <Form.Control
              type="text"
              name="nome_centro_custo"
              value={formData.nome_centro_custo}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Nome completo do projeto</Form.Label>
            <Form.Control
              type="text"
              name="identificacao_centro_custo"
              value={formData.identificacao_centro_custo}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              type="date"
              name="data_inicio_centro_custo"
              value={formData.data_inicio_centro_custo}
              onChange={handleChange}
              required
            />
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Data de Fim</Form.Label>
            <Form.Control
              type="date"
              name="data_fim_centro_custo"
              value={formData.data_fim_centro_custo}
              onChange={handleChange}
            />
          </Form.Group>
    
          <Button variant="primary" type="submit" disabled>
            Enviar
          </Button>
        </Form>
        </>
      )
}
export default Projetos;