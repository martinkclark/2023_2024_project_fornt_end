import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useAuth } from 'src/hooks/useAuth';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    marginBottom: theme.spacing(2), // Increase spacing between fields
  },
  modalContent: {
    width: 800, // Set desired width of the modal content
    padding: theme.spacing(6), // Add padding to the modal content
    backgroundColor: '#fff', // Set background color of the modal content
    borderRadius: 8, // Add border radius for a more genuine look
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add box shadow for depth effect
  },
}));

function My_Modal() {
  const classes = useStyles();
  const { Transaction_isModalOpen, Transaction_handleCloseModal, handleVendorTransactionFormSubmit, vendor_transaction_form } = useAuth();

  return (
    <Modal open={Transaction_isModalOpen} onClose={Transaction_handleCloseModal} className={classes.modal}>
      <Box className={classes.modalContent}>
        <Typography variant="h6" gutterBottom>Please review your Transaction Data</Typography>
        <div className={classes.fieldContainer}>
          <Typography>Vendor ID: {vendor_transaction_form.vendor_id}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography>Financial Year: {vendor_transaction_form.financial_year}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography variant="body1">Date of Payment: {vendor_transaction_form.date_of_payment}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography>Invoice Number: {vendor_transaction_form.invoice_number}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography>Gross Amount: {vendor_transaction_form.gross_amount}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography>IT Taxable Amount: {vendor_transaction_form.it_taxable_amount}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography>Section Code: {vendor_transaction_form.section_code}</Typography>
        </div>
        <div className={classes.fieldContainer}>
          <Typography>Check the box to confirm your submission</Typography>
        </div>
        <Button variant="contained" color="primary" onClick={handleVendorTransactionFormSubmit}>
          Confirm Transaction
        </Button>
      </Box>
    </Modal>
  );
}

export default My_Modal;
