import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

interface Child {
  room: string;
  examClassId: string;
  name: string;
  courseId: string;
  time: string;
  instructorName: string;
  totalStudent: string;
  orderInfo: string;
}

interface ExamClass {
  examClassId: string;
  child: Child[];
}

interface ExamData {
  name: string;
  list: ExamClass[];
}

interface Props {
  data: ExamData;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '14%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: '#f2f2f2',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
});

const GeneratePDF: React.FC<Props> = ({ data }) => (
  <PDFViewer width="100%" height="700">
    <Document>
      <Page style={styles.page}>
        <Text style={styles.heading}>{data.name}</Text>
        {data.list.map((examClass, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.heading}>Class ID: {examClass.examClassId}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Room</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Course ID</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Time</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Instructor</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Total Students</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellHeader}>Order Info</Text>
                </View>
              </View>
              {examClass.child.map((child, childIndex) => (
                <View style={styles.tableRow} key={childIndex}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.room}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.courseId}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.time}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.instructorName}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.totalStudent}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{child.orderInfo}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  </PDFViewer>
);

export default GeneratePDF;
