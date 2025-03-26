import React from "react";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable explicitly

const GuideSummaryPDF = ({ guides }) => {
  const generatePDF = () => {
    try {
      console.log("Generating PDF...");
      console.log("Guides data:", guides);

      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text("Tour Guides Summary", 14, 20);

      // Add total guides
      doc.setFontSize(12);
      doc.text(`Total Guides: ${guides.length}`, 14, 30);

      // Define table columns
      const tableColumn = [
        "Guide ID",
        "Guide Name",
        "Languages",
        "Contact No",
        "Experience",
        "Charges/Tour",
      ];

      // Map guides data to table rows
      const tableRows = guides.map((guide) => [
        guide.tourGuideID || "N/A",
        guide.name || "N/A",
        guide.language ? guide.language.join(", ") : "N/A",
        guide.Contact || "N/A",
        guide.experience || "N/A",
        guide.charges || "N/A",
      ]);

      // Use autoTable directly
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: "striped",
        headStyles: { fillColor: [22, 160, 133] },
      });

      // Save the PDF
      doc.save("tour-guides-summary.pdf");
      console.log("PDF generated and saved successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <Button variant="success" onClick={generatePDF}>
      Generate PDF Summary
    </Button>
  );
};

export default GuideSummaryPDF;