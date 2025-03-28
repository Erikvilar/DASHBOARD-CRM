import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Arquivos = () => {
  const token = localStorage.getItem("JWT");
  const [formData, setFormData] = useState({
    nome: "",
    file: null,
  });
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://10.2.128.20:6680/teste/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };
console.log(formData)
  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded">

      <Form.Group className="mb-3">
        <Form.Label>Nome e sobrenome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};
export default Arquivos;
