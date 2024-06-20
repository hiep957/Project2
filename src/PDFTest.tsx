import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Roboto-Medium",
  src: "src/font/Roboto-Medium.ttf",
});
const styles = StyleSheet.create({
  container: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    fontSize: 12,
  },
  header: {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontSize: 24,
    fontFamily: "Roboto-Medium",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",

    padding: 5,
  },
});
type PDFTestProps = {
    abc: any;
    input: any;
  };
const PDFTest :React.FC<PDFTestProps> =  ({ abc,input }) => {
  console.log("PDF:", abc);
  console.log(input);
  return (
    <Document>
      <Page size="A4">
        <View style={styles.header}>
            <Text>{abc.IT1140.name} - IT1140</Text></View>
        <View style={styles.container}>
          {abc.IT1140.list.map((classItem: any, index: number) => (
            <View key={classItem.examClassId} style={styles.row}>
              <View style={styles.column}>
                <Text>Mã Lớp thi </Text>
                <Text>{classItem.examClassId}</Text>
              </View>
              <View style={styles.column}>
                {classItem.child.map((session: any, index: number) => (
                  <View style={styles.row}>
                    <View key={session.room} style={styles.column}>
                      <Text>Kíp thi</Text>
                      <Text>{session.time}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text>Phòng thi</Text>
                      <Text>{session.room}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text>Số SV</Text>
                      <Text>{session.totalStudent}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text>Từ -- tới STT bảng điểm</Text>
                      <Text>{session.orderInfo}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text>Số SV</Text>
                      <Text>{session.totalStudent}</Text>
                    </View>
                    <View style={styles.column}>
                      <Text>Giảng viên lý thuyết</Text>
                      <Text>{session.instructorName}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFTest;
