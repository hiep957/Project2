// PDFDocument.tsx

// import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Dữ liệu về điểm thi
  Font.register({
    family: "Sans-serif",
    src: "src/font/Roboto-Medium.ttf",
  });
interface Student {
  STT: number;
  MSSV: string;
  HoTen: string;
  NgaySinh: string;
  Lop: string;
  Diem: number;
  KyTen: string;
}
const data: Student[] = [
  {
    STT: 1,
    MSSV: "SV001",
    HoTen: "Nguyễn Văn A",
    NgaySinh: "01/01/2000",
    Lop: "20CTT1",
    Diem: 85,
    KyTen: "[Ký tên]",
  },
  {
    STT: 2,
    MSSV: "SV002",
    HoTen: "Trần Thị B",
    NgaySinh: "02/02/2000",
    Lop: "20CTT2",
    Diem: 78,
    KyTen: "[Ký tên]",
  },
  {
    STT: 3,
    MSSV: "SV003",
    HoTen: "Lê Văn C",
    NgaySinh: "03/03/2000",
    Lop: "20CTT3",
    Diem: 92,
    KyTen: "[Ký tên]",
  },
  {
    STT: 4,
    MSSV: "SV004",
    HoTen: "Phạm Thị D",
    NgaySinh: "04/04/2000",
    Lop: "20CTT1",
    Diem: 80,
    KyTen: "[Ký tên]",
  },
  {
    STT: 5,
    MSSV: "SV005",
    HoTen: "Hoàng Văn E",
    NgaySinh: "05/05/2000",
    Lop: "20CTT2",
    Diem: 70,
    KyTen: "[Ký tên]",
  },
  {
    STT: 6,
    MSSV: "SV006",
    HoTen: "Nguyễn Thị F",
    NgaySinh: "06/06/2000",
    Lop: "20CTT3",
    Diem: 88,
    KyTen: "[Ký tên]",
  },
  {
    STT: 7,
    MSSV: "SV007",
    HoTen: "Trần Văn G",
    NgaySinh: "07/07/2000",
    Lop: "20CTT1",
    Diem: 76,
    KyTen: "[Ký tên]",
  },
  {
    STT: 8,
    MSSV: "SV008",
    HoTen: "Lê Thị H",
    NgaySinh: "08/08/2000",
    Lop: "20CTT2",
    Diem: 90,
    KyTen: "[Ký tên]",
  },
  {
    STT: 9,
    MSSV: "SV009",
    HoTen: "Phạm Văn I",
    NgaySinh: "09/09/2000",
    Lop: "20CTT3",
    Diem: 85,
    KyTen: "[Ký tên]",
  },
  {
    STT: 10,
    MSSV: "SV010",
    HoTen: "Hoàng Thị K",
    NgaySinh: "10/10/2000",
    Lop: "20CTT1",
    Diem: 82,
    KyTen: "[Ký tên]",
  },
  {
    STT: 11,
    MSSV: "SV011",
    HoTen: "Nguyễn Văn L",
    NgaySinh: "11/11/2000",
    Lop: "20CTT2",
    Diem: 75,
    KyTen: "[Ký tên]",
  },
  {
    STT: 12,
    MSSV: "SV012",
    HoTen: "Trần Thị M",
    NgaySinh: "12/12/2000",
    Lop: "20CTT3",
    Diem: 88,
    KyTen: "[Ký tên]",
  },
  {
    STT: 13,
    MSSV: "SV013",
    HoTen: "Lê Văn N",
    NgaySinh: "13/01/2001",
    Lop: "20CTT1",
    Diem: 84,
    KyTen: "[Ký tên]",
  },
  {
    STT: 14,
    MSSV: "SV014",
    HoTen: "Phạm Thị P",
    NgaySinh: "14/02/2001",
    Lop: "20CTT2",
    Diem: 79,
    KyTen: "[Ký tên]",
  },
  {
    STT: 15,
    MSSV: "SV015",
    HoTen: "Hoàng Văn Q",
    NgaySinh: "15/03/2001",
    Lop: "20CTT3",
    Diem: 91,
    KyTen: "[Ký tên]",
  },
  {
    STT: 16,
    MSSV: "SV016",
    HoTen: "Nguyễn Thị R",
    NgaySinh: "16/04/2001",
    Lop: "20CTT1",
    Diem: 72,
    KyTen: "[Ký tên]",
  },
  {
    STT: 17,
    MSSV: "SV017",
    HoTen: "Trần Văn S",
    NgaySinh: "17/05/2001",
    Lop: "20CTT2",
    Diem: 86,
    KyTen: "[Ký tên]",
  },
  {
    STT: 18,
    MSSV: "SV018",
    HoTen: "Lê Thị T",
    NgaySinh: "18/06/2001",
    Lop: "20CTT3",
    Diem: 83,
    KyTen: "[Ký tên]",
  },
  {
    STT: 19,
    MSSV: "SV019",
    HoTen: "Phạm Văn U",
    NgaySinh: "19/07/2001",
    Lop: "20CTT1",
    Diem: 77,
    KyTen: "[Ký tên]",
  },
  {
    STT: 20,
    MSSV: "SV020",
    HoTen: "Hoàng Thị V",
    NgaySinh: "20/08/2001",
    Lop: "20CTT2",
    Diem: 89,
    KyTen: "[Ký tên]",
  },
  {
    STT: 21,
    MSSV: "SV021",
    HoTen: "Nguyễn Văn X",
    NgaySinh: "21/09/2001",
    Lop: "20CTT3",
    Diem: 81,
    KyTen: "[Ký tên]",
  },
];

const styles = StyleSheet.create({
  text: {
    fontFamily: "Sans-serif",
    fontSize: 12,
    textAlign: "center",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "red",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display:'flex',
    
  },
  row: {
    flexDirection: "row",
  },

  column: {
    width: "33.33%",
    padding: 5,
  },
});

const PDFDocument = () => {
  console.log(data);
  return (
    <Document>
      <Page size="A4">
        
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.column}>
            <Text style={styles.text}>Đại học Bách Khoa Hà Nội</Text>
            <Text style={styles.text}>Trường CNTT&TT</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Danh sách thí sinh dự thi</Text>
            <Text style={styles.text}>Học phần: TIN HỌC ĐẠI CƯƠNG</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>STT kíp</Text>
            <Text style={styles.text}>1</Text>
          </View>
        </View>


       
        <View style={{display:'flex', flexDirection:'column'}}>
          
            <View style={{backgroundColor:'white',flexDirection:'row',margin:'0px 28px', border:'1px solid #000 '}}>
              <View style={{flex:'1',borderRight: '1px solid #000'}} >
                <Text style={styles.text}>STT</Text>
              </View>
              <View style={{flex:'2',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>MSSV</Text>
              </View>
              <View style={{flex:'6',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>Họ tên</Text>
              </View>
              <View style={{flex:'3',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>Ngày sinh</Text>
              </View>
              <View style={{flex:'6',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>Lớp</Text>
              </View>
              <View style={{flex:'3',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>Điểm Số câu đúng</Text>
              </View>
              <View style={{flex:'2',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>Ký tên</Text>
              </View>
            </View>

            {data.map((student) => (
              <View style={{backgroundColor:'white',flexDirection:'row',margin:'0px 28px', border:'1px solid #000 '}}>
              <View style={{flex:'1',borderRight: '1px solid #000'}} >
                <Text style={styles.text}>{student.STT}</Text>
              </View>
              <View style={{flex:'2',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>{student.MSSV}</Text>
              </View>
              <View style={{flex:'6',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>{student.HoTen}</Text>
              </View>
              <View style={{flex:'3',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>{student.NgaySinh}</Text>
              </View>
              <View style={{flex:'6',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>{student.Lop}</Text>
              </View>
              <View style={{flex:'3',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>{student.Diem}</Text>
              </View>
              <View style={{flex:'2',borderRight: '1px solid #000'}}>
                <Text style={styles.text}>{student.KyTen}</Text>
              </View>
            </View>
            ))}
          
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
