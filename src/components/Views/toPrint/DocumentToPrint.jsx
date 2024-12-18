import { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function DocumentToPrint({ data }) {
  const [dataPrint, setDataPrint] = useState([]);
  const handleData = (data) => {
    if (data) {
      setDataPrint(data);
    } else {
      null;
    }
  };
  useEffect(() => {
    handleData(data);
  }, [data]);

  const {
    nome_usuario,
    tipo_usuario,
    caminho_imagem_item,
    descricao_item,
    modelo_descricao,
    serie_descricao,
    termo,
    local,
    valor_item,
    sde_item,
    status_item,

  } = dataPrint;


  console.log(caminho_imagem_item);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text style={{fontWeight:700, color:"orange"}}>{descricao_item}</Text>
            <Text>{termo}</Text>
            <Text style={{color:"black", fontWeight:700}}>{valor_item}</Text>
          <Image style={{width:250, height:250}} source={caminho_imagem_item} />
        </View>
      </Page>
    </Document>
  );
}
