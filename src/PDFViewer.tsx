// PDFViewer.tsx

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const PDFViewerComponent = ()=> {

  return (
    <PDFViewer className='flex bg-blue-300 h-full w-full '>
      <PDFDocument />
    </PDFViewer>
  );
  
  
};

export default PDFViewerComponent;
