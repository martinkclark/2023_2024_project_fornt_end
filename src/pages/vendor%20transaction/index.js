import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box, MenuItem, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from 'src/hooks/useAuth';
import My_Modal, { Modal } from './components/My_Modal';


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
}));

const VendorTransactionForm = () => {
  const classes = useStyles();
  const { vendors } = useAuth();
  const {
    vendor_transaction_form,
    handleVendorTransactionFormChange,
    handleVendorTransactionFormSubmit,
    vendor_transaction_form_errorMessage,
    handleCloseVendorError,
    Transaction_handleSubmit
  } = useAuth();


  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Vendor Transaction Form
      </Typography>
      <Paper className={classes.paper}>
        <form onSubmit={Transaction_handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="vendor_id"
                label="Vendor ID"
                select
                value={vendor_transaction_form.vendor_id}
                onChange={handleVendorTransactionFormChange}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.id}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="financial_year"
                label="Financial Year"
                select
                value={vendor_transaction_form.financial_year}
                onChange={handleVendorTransactionFormChange}
              >
                <MenuItem value="2022-2023">2022-2023</MenuItem>
                <MenuItem value="2023-2024">2023-2024</MenuItem>
                <MenuItem value="2024-2025">2024-2025</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="date_of_payment"
                label="Date of Payment"
                type="date"
                value={vendor_transaction_form.date_of_payment}
                onChange={handleVendorTransactionFormChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="invoice_number"
                label="Invoice Number"
                value={vendor_transaction_form.invoice_number}
                onChange={handleVendorTransactionFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="gross_amount"
                label="Gross Amount"
                type="number"
                value={vendor_transaction_form.gross_amount}
                onChange={handleVendorTransactionFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="it_taxable_amount"
                label="IT Taxable Amount"
                type="number"
                value={vendor_transaction_form.it_taxable_amount}
                onChange={handleVendorTransactionFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="section_code"
                label="Section Code"
                value={vendor_transaction_form.section_code}
                onChange={handleVendorTransactionFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Make Transaction
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={!!vendor_transaction_form_errorMessage}
        autoHideDuration={2000}
        onClose={handleCloseVendorError}
        message={vendor_transaction_form_errorMessage}
      />
      <My_Modal/>

    </div>
  );
};

export default VendorTransactionForm;

