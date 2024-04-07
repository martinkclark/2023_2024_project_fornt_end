import React, { useState , useEffect } from 'react';
import { Container, Grid, TextField, Button, MenuItem ,Snackbar} from '@mui/material';
import { useAuth } from 'src/hooks/useAuth';

/*
    SQL structure

-- SQL for creating the 'vendors' table
    CREATE TABLE vendors (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pan_number VARCHAR(255) UNIQUE,
    gst_number VARCHAR(255) UNIQUE,
    tin VARCHAR(255),
    vendor_name VARCHAR(255),
    owner_name VARCHAR(255),
    vendor_type VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);

*/


const VendorRegistrationForm = () => {

    const {vendor_registration_form, handleVendorFormChange,handleVendorFormSubmit,vendor_form_errorMessage,handleCloseVendorError} = useAuth();
    
  return (
    <Container maxWidth="sm">
      <form onSubmit={(e) => handleVendorFormSubmit(e)}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
            <TextField
              fullWidth
              label="PAN"
              name="pan_number"
              value={vendor_registration_form.pan_number}
              onChange={handleVendorFormChange}
        />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="TIN"
              name="tin"
              value={vendor_registration_form.tin}
              onChange={handleVendorFormChange}
              // Add `nullable` handling logic if needed
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Vendor Name"
              name="vendor_name"
              value={vendor_registration_form.vendor_name}
              onChange={handleVendorFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Owner Name"
              name="owner_name"
              value={vendor_registration_form.owner_name}
              onChange={handleVendorFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Vendor Type"
              name="vendor_type"
              value={vendor_registration_form.vendor_type}
              onChange={handleVendorFormChange}
            >
              {/* Add options for vendor type */}
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={4}
              value={vendor_registration_form.address}
              onChange={handleVendorFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" >
              Submit 
            </Button>
            <Snackbar
            open={!!vendor_form_errorMessage}
            autoHideDuration={2000}
            onClose={handleCloseVendorError}
            message={vendor_form_errorMessage}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default VendorRegistrationForm;
