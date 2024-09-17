import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';

const generateReport = async (caseDetails, bailHearings, attachedDocuments) => {
    const doc = new jsPDF();

    // Add Case Details
    doc.setFontSize(16);
    doc.text("Case Report", 10, 10);

    // Case Information
    const caseInfo = `
    Case Number: ${caseDetails.caseNumber}
    Applicant Name: ${caseDetails.applicantName}
    Applicant Phone: ${caseDetails.phone}
    Accused Name: ${caseDetails.accusedName}
    Charges: ${caseDetails.charges}
    Relevant Law: ${caseDetails.law}
    Summary: ${caseDetails.summary}
    Date of Arrest: ${caseDetails.arrestDate}
    Bail Status: ${caseDetails.bailStatus}
  `;
    doc.setFontSize(12);
    doc.text(caseInfo, 10, 20);

    // Add Bail Hearings
    doc.setFontSize(16);
    doc.text("Bail Hearings", 10, 70);

    bailHearings.forEach((hearing, index) => {
        const yOffset = 80 + index * 30;
        doc.setFontSize(12);
        doc.text(
            `${index + 1}. Hearing Date: ${hearing.date}, Status: ${hearing.status}`,
            10, yOffset
        );
        doc.text(`Details: ${hearing.details}`, 10, yOffset + 10);
    });

    // Save base report PDF as a blob
    const basePdfBlob = doc.output('blob');
    const bloburl = URL.createObjectURL(basePdfBlob);
    console.log(bloburl);

    // If there are attached documents, merge them with the base PDF
    if (attachedDocuments.length > 0) {
        const mergedPdfBytes = await mergePdfs( attachedDocuments);
        const mergedBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(mergedBlob);
        downloadLink.download = 'merged_case_report.pdf';
        downloadLink.click();
    } else {
        // If no attached documents, just save the base PDF
        doc.save('case_report.pdf');
    }
    return doc;
};

const handleSubmit = async () => {

    const caseDetails = {
        caseNumber: 'ABC123',
        applicantName: 'ABC Kumar',
        phone: '9998887770',
        accusedName: 'XYZ Kumar',
        charges: 'Theft, Assault',
        law: 'Indian Penal Code (IPC) Section 378',
        summary: 'The accused is charged with theft...',
        arrestDate: '21 August 2024',
        bailStatus: 'Initial Review',
    };

    const bailHearings = [
        { date: '24 August 2024', status: 'Awaiting Judge Decision', details: 'First hearing' },
        { date: '29 August 2024', status: 'Upcoming', details: 'Scheduled at Bombay High Court' },
    ];

    // Simulating attached files as array of File objects for example
    const attachedDocuments = [
        './assets/fir.pdf','./assets/allahbadhighcourtcase.pdf'
    ];

    await generateReport(caseDetails, bailHearings, attachedDocuments);
};

const mergePdfs = async (files) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        // Use FileReader to read the file as an ArrayBuffer
        const arrayBuffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });

        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// Render file inputs and the submit button in your React component
export const getReport = async () => {
    // const docs = 
    const init = await handleSubmit();
    // const final = await mergePdfs(init)
    return init;
}