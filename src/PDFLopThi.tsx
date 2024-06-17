import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
  } from "@react-pdf/renderer";

export type pdfLopThi = {
    malopthi: string;
    kipthi: string;
    phongthi: string[];
    soSv: number;
    giangvien: string;
}
Font.register({
    family: "Roboto",
    src: "src/font/Roboto-Medium.ttf",
  });
const style = StyleSheet.create({
    text: {
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight:'thin'
      },
    header: {
        fontFamily: "Roboto",
        fontSize: 24,
        fontWeight: 'bold',
    },
    s:{
        fontSize: 16,
        fontWeight: 'bold',
    
    }
})

const PDFLopThi = () => {
    return (
        <Document>
            <Page size="A4">

                <View style={{display:'flex',alignItems:'center', marginTop:'16px',marginBottom:'32px'}}>
                    <Text style={style.header}>Hoc phan: TIN HỌC ĐẠI CƯƠNG sss</Text>
                    
                </View>

                <View style={style.text}>
                    
                    <View style={{display:'flex',flexDirection:'row', marginLeft:'32px',}}>
                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>Mã lớp thi</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>123456</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center', fontWeight:'bold'}}>Mã lớp thi</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center',fontWeight:'bold'}}>123456</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>Mã lớp thi</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>123456</Text>
                        </View>
                        
                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>Số SV</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>2</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>10</Text>
                        </View>

                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>Số SV</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>2</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>10</Text>
                        </View>

                        <View style={{display:'flex',flexDirection:'column'}}>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center', fontWeight:'light'}}>Số SV</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>2</Text>
                            <Text style={{padding:'4px',border:'1px solid black',textAlign:'center'}}>10</Text>
                        </View>

                    </View>
                </View>


            </Page>

            <Page size="A4">
                <View>
                    <Text style={style.text}>Hiệp</Text>
                </View>
            </Page>

           
            
        </Document>
    )
}

export default PDFLopThi;