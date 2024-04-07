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

function My_Modal({open,setOpen,vendorData}) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={()=>{
        setOpen(false);
        
    }} className={classes.modal}>

        
      <Box className={classes.modalContent}>
        
        <Typography variant="h6" gutterBottom >Please review your Transaction Data</Typography>
        <Typography variant="body1" gutterBottom>Vendor ID: {vendorData.id}</Typography>
        <Typography variant="body1" gutterBottom>PAN Number: {vendorData.pan_number}</Typography>
        <Typography variant="body1" gutterBottom>TIN: {vendorData.tin}</Typography>
        <Typography variant="body1" gutterBottom>Vendor Name: {vendorData.vendor_name}</Typography>
        <Typography variant="body1" gutterBottom>Owner Name: {vendorData.owner_name}</Typography>
        <Typography variant="body1" gutterBottom>Vendor Type: {vendorData.vendor_type}</Typography>
        <Typography variant="body1" gutterBottom>Address: {vendorData.address}</Typography>
        <Button variant="contained" color="primary" onClick={()=>{
            setOpen(false);
        }}>Close</Button>

      </Box>
    </Modal>
  );
}

export default My_Modal;
