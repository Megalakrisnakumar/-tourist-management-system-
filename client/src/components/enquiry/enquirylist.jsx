import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Typography, Tooltip, TextField, MenuItem, Box, Button
} from "@mui/material";
import { Delete, Email, Phone, WhatsApp, PictureAsPdf, GridOn } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const EnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/enquiries")
      .then(res => setEnquiries(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/enquiry/${id}`);
      setEnquiries(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const uniqueDestinations = [...new Set(enquiries.map(e => e.destination))];

  const filteredEnquiries = enquiries.filter(enquiry => {
    const search = searchTerm.toLowerCase();
    return (
      (!destinationFilter || enquiry.destination === destinationFilter) &&
      (
        enquiry.name.toLowerCase().includes(search) ||
        enquiry.email.toLowerCase().includes(search) ||
        enquiry.destination.toLowerCase().includes(search)
      )
    );
  });

  // ✅ Export PDF (manual layout, no autoTable)
  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Tour Enquiries", 10, y);
    y += 10;

    doc.setFontSize(10);

    filteredEnquiries.forEach((e, index) => {
      const date = new Date(e.date).toLocaleDateString();
      const line = `
${index + 1}. Name: ${e.name}
    Phone: ${e.phone}, Email: ${e.email}
    Destination: ${e.destination}, Date: ${date}
    Message: ${e.message}
`;
      const split = doc.splitTextToSize(line, 180);
      doc.text(split, 10, y);
      y += split.length * 6 + 4;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("enquiries.pdf");
  };

  // ✅ Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEnquiries.map(e => ({
      Name: e.name,
      Phone: e.phone,
      Email: e.email,
      Destination: e.destination,
      Date: new Date(e.date).toLocaleDateString(),
      Message: e.message
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "enquiries.xlsx");
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 4, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>Tour Enquiries</Typography>

      {/* Search + Filter + Export Buttons */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextField
          label="Destination"
          variant="outlined"
          size="small"
          select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {uniqueDestinations.map((dest) => (
            <MenuItem key={dest} value={dest}>{dest}</MenuItem>
          ))}
        </TextField>

        <Button
          variant="outlined"
          color="success"
          startIcon={<PictureAsPdf />}
          onClick={exportPDF}
        >
          Export PDF
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GridOn />}
          onClick={exportExcel}
        >
          Export Excel
        </Button>
      </Box>

      <motion.div variants={tableVariants} initial="hidden" animate="visible">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEnquiries.map((enquiry) => (
              <motion.tr key={enquiry._id} variants={rowVariants}>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>
                  <Tooltip title="Call">
                    <IconButton color="primary" onClick={() => window.open(`tel:${enquiry.phone}`)}>
                      <Phone />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="WhatsApp">
                    <IconButton color="success" onClick={() => window.open(`https://wa.me/${enquiry.phone}`)}>
                      <WhatsApp />
                    </IconButton>
                  </Tooltip>
                  {enquiry.phone}
                </TableCell>
                <TableCell>
                  <Tooltip title="Send Email">
                    <IconButton color="secondary" onClick={() => window.open(`mailto:${enquiry.email}`)}>
                      <Email />
                    </IconButton>
                  </Tooltip>
                  {enquiry.email}
                </TableCell>
                <TableCell>{enquiry.destination}</TableCell>
                <TableCell>{new Date(enquiry.date).toLocaleDateString()}</TableCell>
                <TableCell>{enquiry.message}</TableCell>
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(enquiry._id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </TableContainer>
  );
};

export default EnquiryTable;
