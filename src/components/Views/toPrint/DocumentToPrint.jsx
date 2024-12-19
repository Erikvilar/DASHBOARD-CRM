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
    width: 2480,
    backgroundColor:"white",
  }
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

let {
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
console.log(caminho_imagem_item)


const currentDate = new Date().toLocaleDateString();



  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            padding:50,
            margin:"auto",
            width: 2480,
            backgroundColor:"white",
           
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 20,
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 50, height: 50,  }}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ufu_logo.svg/1200px-Ufu_logo.svg.png",
              }}
            />
            <Image
              style={{ width: 120, height: 50, marginLeft: 10 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYZ3H-SzHOG7Pdjyg-LosOqvhNt7IYVCEsQ&s",
              }}
            />
            <Image
              style={{ width: 200, height: 50, marginLeft: 10 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTXy_9SeDEu9vgPq30htb2xQhb4nNOklwj-ReOIWlwAgUJGzprZFgIOLMvKbOVxHSPmg&usqp=CAU",
              }}
            />
            <View style={{width:200, marginLeft: 10 }}>
              <Text style={{fontSize:12}}>Universidade Federal de Uberlândia</Text>
              <Text style={{fontSize:12}}>Pró Reitoria de planejamento e administração</Text>
              <Text style={{fontSize:12}}>Diretoria de administração de materiais</Text>
              <Text style={{fontSize:12}}>Termo concedido e criado pelo LTAD</Text>
              <Text style={{fontSize:12}}>{`${currentDate}`}</Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "cornflowerblue",
              fontWeight: 700,
            }}
          >
            {`RELATORIO DO ITEM ${descricao_item}`}
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <View>
              <Text style={{fontSize:12}}>
                <Text>Nome: </Text>CETR BRUKER
              </Text>
            </View>
            <View>
              <Text style={{fontSize:12}}>
                <Text>Valor: R$</Text>{`${valor_item}`}
              </Text>
            </View>
            <View>
              <Text style={{fontSize:12}}>
                <Text>Status: <Text>{`${status_item}`}</Text></Text>
              </Text>
            </View>
            <View>
              <Text style={{fontSize:12}}>
                <Text>SDE:<Text>{`${sde_item}`}</Text></Text>
              </Text>
            </View>
            <View>
              <Text style={{fontSize:12}}>
                <Text>Local: <Text>{`${local}`}</Text> </Text>
              </Text>
            </View>
          </View>

          <Image
            style={{ width: 200, height: 200, margin: "auto" }}
            source={{
              uri:`${caminho_imagem_item}`,
              cache: 'only-if-cached'
            }}
          />
          <View>
            <Text  style={{fontSize:12}}>{`${modelo_descricao}`}</Text>
            <Text style={{fontSize:12}}>{`${serie_descricao}`}</Text>
            <Text  style={{fontSize:12}}>
              Responsável: <Text>{`${nome_usuario}`}</Text>
            </Text>
            <Text  style={{fontSize:12}}>
              Ocupação: <Text>{`${tipo_usuario}`}</Text>
            </Text>
            <Text  style={{fontSize:12}}>
             Termo de referência : <Text>{`${termo}`}</Text>
            </Text>
          </View>
          <View style={{ display: "flex", alignItems: "start" }}>
            
            <Image   style={{ width: 250, height: 100}} source={{uri:"src/images/assinatura.jpg"}} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
