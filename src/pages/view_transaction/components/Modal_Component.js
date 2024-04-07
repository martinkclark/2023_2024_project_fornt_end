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

function Modal_Component({open,setOpen,vendoTransactionData}) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={()=>{
        setOpen(false);
        
    }} className={classes.modal}>

        
      <Box className={classes.modalContent}>  
        <Typography variant="h4">Vendor Transaction</Typography>
        <Typography variant="h6">ID: {vendoTransactionData.id}</Typography>
        <Typography variant="h6">Vendor ID: {vendoTransactionData.vendor_id}</Typography>
        <Typography variant="h6">Financial Year: {vendoTransactionData.financial_year}</Typography>
        <Typography variant="h6">Date Of Payment: {vendoTransactionData.date_of_payment}</Typography>
        <Typography variant="h6">Invoice Number: {vendoTransactionData.invoice_number}</Typography>
        <Typography variant="h6">Gross Amount: {vendoTransactionData.gross_amount}</Typography>
        <Typography variant="h6">IT Taxable Amount: {vendoTransactionData.it_taxable_amount}</Typography>
        <Typography variant="h6">Section Code: {vendoTransactionData.section_code}</Typography>
        <Typography variant="h6">Updated At: {new Date(vendoTransactionData.updated_at).toLocaleString()}</Typography>
        <Button variant="contained" color="primary" onClick={()=>{
            setOpen(false);
        }}>Close</Button>

      </Box>
    </Modal>
  );
}

export default Modal_Component;
