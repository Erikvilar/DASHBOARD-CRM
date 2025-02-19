import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

export default function DocumentToPrint({ data }) {
  const currentDate = new Date().toLocaleDateString();
  return (
    <Document>
      <Page
        size="A4"
        style={{ flexDirection: "row", width: 2480, backgroundColor: "white" }}
      >
       {/* componente pagina principal */}
       <View>
         {/* componente header */}
       <View style={{width:"100%", height:100, display:"flex", alignItems:"center", justifyContent:"center",padding:20}}>
       <View style={{ width:"95%", height:90, display:"flex", flexDirection:"row", alignItems:"center", alignContent:"center"}}>
        <View style={{width:"20%", height:100, display:"flex", justifyContent:"center", alignContent:"center"}}>
          <Image src={{uri:"https://upload.wikimedia.org/wikipedia/commons/7/76/UFU_LOGO.png"}} style={{width:110, paddingTop:2, paddingRight:10}}/>
        </View>
        <View style={{width:"60%", height:80, padding:15, alignItems:"center", display:"flex"}}>
          <Text style={{fontSize:12, margin:"auto", fontWeight:700}}>
            Universidade Federal de Uberlândia
          </Text>
          <Text style={{fontSize:12,margin:"auto",fontWeight:700}}>
            Faculdade de Engenharia Mecânica
          </Text>
          <Text style={{fontSize:12,margin:"auto",fontWeight:700}}>
            Laboratório de Tecnologia em Atrito e Desgaste
          </Text>
        </View>


        <View style={{width:"20%", height:120}}>
        <Image src={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYZ3H-SzHOG7Pdjyg-LosOqvhNt7IYVCEsQ&s"}}style={{width:120, paddingBottom:15, height:120}}/>

        </View>

       </View>
       </View>
         {/* componente texto principal*/}
       <View style={{width:"100%", paddingTop:20, paddingBottom:5}}>
        <Text style={{fontSize:14, textDecoration:"underline", margin:"auto",fontWeight: 'black',}}>
          RELATORIO DE ITEM PATRIMONIADO
        </Text>
       </View>
      {/*componente principal */}
       <View style={{width:"100%", padding:20}}>
        
        {/*componente de blocos da descrição 1*/}
        
          <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", height:45,display:"flex", flexDirection:"row",marginBottom:10}}>
            
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"20%", height:45}}>
              <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>PROJETO</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"20%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>SDE</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"20%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>PEDIDO</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"20%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>NF/INVOICE</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"20%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>TERMO</Text>
            
            </View>
         
        </View>
              {/*componente de blocos da descrição 2*/}
     
        <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", height:"auto",display:"flex", flexDirection:"row", marginBottom:10}}>
           
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"15%", height:"auto"}}>
              <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>PATRIMÔNIO</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"40%", height:"auto"}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white", borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>DESCRIÇÃO</Text>
            <Text style={{fontSize:7, padding:5}}>MÓDULO DIDÁTICO AVANÇADO DE ELETRÔNICA ANALÓGICA COMPOSTO POR BASTIDOR EM AÇO/ENTRADA BIVOLT/MATRIZES DE CONTATO DE 550 PONTOS/FONTES DE ALIMENTAÇÃO DC FIXAS E VARIÁVEIS/FONTES ALTERNADAS AC1 E AC2/GERADOR DE FUNÇÕES/MEDIDOR DIGITAL/BANCO DE RESISTORES CAPACITORES E INDUTORES/TESTADOR DE CONTINUIDADE/POTENCIÔMETRO/CONECTORES MODELO: MPLA1201EX2 MARCA - ZILOCCHI  </Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"15%", height:"auto"}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white", borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>MARCA</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"15%", height:"auto"}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white", borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>MODELO</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"15%", height:"auto"}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white", borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>SÉRIE</Text>
            
            </View>
        
          </View>
              {/*componente de blocos da descrição 3*/}
  
          <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", height:45,display:"flex", flexDirection:"row",marginBottom:10}}>
            
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"25%", height:45}}>
              <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>LOCAL</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"25%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>RESPONSÁVEL IMEDIATO</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"25%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>RESPONSÁVEL GERAL</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"25%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>SITUAÇÃO DO ITEM</Text>
            </View>
            
      
        </View>
              {/*componente de blocos da descrição 4*/}
      
          <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", height:45,display:"flex", flexDirection:"row",marginBottom:10}}>
            
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"34%", height:45}}>
              <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>FORNECEDOR</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"34%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>E-MAIL</Text>
            </View>
            <View style={{borderWidth:0.5, borderStyle:"solid" ,borderColor:"black", width:"34%", height:45}}>
            <Text style={{borderWidth:0.5, borderStyle:"solid", borderLeft:"white",borderRight:"white",borderTop:"white",borderColor:"black", fontSize:10, fontWeight:800, textAlign:"center",padding:2}}>VALOR DO ITEM</Text>
            </View>
          
    
        </View>
{/*componente de blocos imagens*/}
        <View style={{height:250, display:"flex", flexDirection:"row"}}>
            <Image src={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwVTkgcSnY5Bloc2dGzBTkJdrD0iNJBQx-g&s"}} style={{heigt:200, width:"50%"}}/>
            <Image src={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1bmCGfFJkLXIP_mqTtZpEnrNemii3Y-gnmA&s"}} style={{height:200,width:"50%"}}/>
          
            

        </View>
        <View style={{width:"100%", marginTop:20}}>
              <Text style={{fontSize:10, textAlign:"left"}}>Última modificação realizada por Matheus heitor em 07/02/205 ás 17:17</Text>
            </View>

       </View>
          <View style={{width:"100%"}}>
            <View style={{padding:20, display:"flex", alignContent:"center", justifyContent:"center"}}>
            <Text style={{fontSize:10, textAlign:"center"}}>Av. João Naves de Ávila, 2121, Bloco 5F - Bairro Santa Monica, Uberlândia-MG, CEP:38408-100</Text>
            <Text style={{fontSize:10, textAlign:"center"}}>Telefone: +55 (34) 3230-9506 - www.ltad.mecanica.ufu.br/</Text>
            <Text style={{fontSize:10, textAlign:"center"}}>secretarialtad@mecanica.ufu.br</Text>
            </View>
            </View>
            <View style={{display:"flex", flexDirection:"row"}}>
            <View style={{display:"flex", position:"relative", left:50,justifyContent:"center", margin:"auto", alignSelf:"center"}}>
              <Text style={{fontSize:12, textAlign:"center"}}>Página 1</Text>
            </View>
            <View style={{width:100, justifyContent:"flex-end", display:"flex", position:"relative", right:20}}>
              <Text style={{fontSize:12}}>07/02/2025 17:30</Text>
            </View>
            </View>
       </View>
      </Page>
    </Document>
  );
}
