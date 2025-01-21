import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

export default function DocumentToPrint({ data }) {
  const currentDate = new Date().toLocaleDateString();
  return (
    <Document>
      <Page
        size="A4"
        style={{ flexDirection: "row", width: 2480, backgroundColor: "white" }}
      >
        <View
          style={{
            padding: 50,
            margin: "auto",
            width: 2480,
            backgroundColor: "white",
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
              style={{ width: 50, height: 50 }}
              source="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ufu_logo.svg/1200px-Ufu_logo.svg.png"
              
            />
            <Image
              style={{ width: 120, height: 50, marginLeft: 10 }}
              source= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYZ3H-SzHOG7Pdjyg-LosOqvhNt7IYVCEsQ&s"
            
            />
            <Image
              style={{ width: 200, height: 50, marginLeft: 10 }}
              source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTXy_9SeDEu9vgPq30htb2xQhb4nNOklwj-ReOIWlwAgUJGzprZFgIOLMvKbOVxHSPmg&usqp=CAU"
              
            />
            <View style={{ width: 200, marginLeft: 10 }}>
              <Text style={{ fontSize: 12 }}>
                Universidade Federal de Uberlândia
              </Text>
              <Text style={{ fontSize: 12 }}>
                Pró Reitoria de planejamento e administração
              </Text>
              <Text style={{ fontSize: 12 }}>
                Diretoria de administração de materiais
              </Text>
              <Text style={{ fontSize: 12 }}>
                Termo concedido e criado pelo LTAD
              </Text>
              <Text style={{ fontSize: 12 }}>{`${currentDate}`}</Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "cornflowerblue",
              fontWeight: 700,
            }}
          >
            {`RELATORIO DO ITEM ${data.descricao}`}
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
              <Text style={{ fontSize: 12 }}>
                <Text>Nome: </Text>CETR BRUKER
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>
                <Text>Valor: R$</Text>
                {`${data.valor}`}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>
                <Text>
                  Status: <Text>{`${data.status}`}</Text>
                </Text>
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>
                <Text>
                  SDE:<Text>{`${data.SDE}`}</Text>
                </Text>
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>
                <Text>
                  Local: <Text>{`${data.local}`}</Text>{" "}
                </Text>
              </Text>
            </View>
          </View>

          <Image   style={{ width: 200, height: 200, marginLeft: 10 }} source={data.image || 'src/images/default.png'} />
          <View>
            <Text style={{ fontSize: 12 }}>{`${data.modelo}`}</Text>
            <Text style={{ fontSize: 12 }}>{`${data.serial}`}</Text>
            <Text style={{ fontSize: 12 }}>
              Responsável: <Text>{`${data.responsavel}`}</Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              Ocupação: <Text>{`${data.tipo_usuario}`}</Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              Termo de referência : <Text>{`${data.termo}`}</Text>
            </Text>
          </View>
          <View style={{ display: "flex", alignItems: "start" }}>
            <Image style={{width:100, height:100}} source="src/images/assinatura.jpg" />
          </View>
        </View>
      </Page>
    </Document>
  );
}
