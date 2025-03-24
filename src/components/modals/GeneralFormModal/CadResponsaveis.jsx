import { useState } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import Unauthorized from "../../Views/visualAccess/unauthorized";

// Definindo o worker do PDF.js corretamente
GlobalWorkerOptions.workerSrc = pdfWorker;
const CadResponsaveis = ({ role }) => {
  const [extractedText, setExtractedText] = useState("");

  // Função para lidar com o upload do arquivo PDF
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);

      const reader = new FileReader();
      reader.onload = async (e) => {
        console.log("Leitura do arquivo concluída.");
        const pdfData = new Uint8Array(e.target.result);
        await extractTextFromPdf(pdfData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Função para extrair o texto do PDF
  const extractTextFromPdf = async (pdfData) => {
    try {
      console.log("Iniciando extração de texto...");
      const loadingTask = getDocument({ data: pdfData });
      const pdf = await loadingTask.promise;

      console.log(`PDF carregado com ${pdf.numPages} páginas.`);

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        console.log(`Página ${i} processada.`);

        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      setExtractedText(fullText);
      console.log("Texto extraído com sucesso.");
    } catch (error) {
      console.error("Erro ao extrair texto do PDF:", error);
      setExtractedText("Erro ao processar o PDF.");
    }
  };
  console.log(extractedText);
  return role === "USER" || null ? (
    <Unauthorized/>
  ) : (
    <div>
      <h1>Extrair Texto de PDF</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <div>
        <h2>Texto Extraído:</h2>
        <p style={{ color: "green" }}>{extractedText}</p>
      </div>
    </div>
  );
};

export default CadResponsaveis;
