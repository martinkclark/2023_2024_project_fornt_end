import React, { useState, useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, withStyles } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import ModelPopup from './ModelPopup';

const styles = {
  tableRow: {
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  curvedBorder: {
    borderRadius: 2,
  },
};

function Index({ classes }) {
    const { vendors, handleVendorsdata } = useAuth();
    const [open, setOpen] = useState(false);
    const [vendorData, setVendorData] = useState({});

    useEffect(() => {
        handleVendorsdata();
    }, []);

    return (
        <div>
            <ModelPopup open={open} setOpen={setOpen} vendorData={vendorData} />
            <Typography variant="h6">Vendors</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>PAN Number</b></TableCell>
                        <TableCell><b>TIN</b></TableCell>
                        <TableCell><b>Vendor Name</b></TableCell>
                        <TableCell><b>Owner Name</b></TableCell>
                        <TableCell><b>Vendor Type</b></TableCell>
                        <TableCell><b>Address</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vendors.map((vendor) => (
                        <TableRow
                            key={vendor.id}
                            className={`${classes.tableRow} ${classes.curvedBorder}`}
                            onClick={() => {
                                setOpen(true);
                                setVendorData(vendor);
                            }}
                        >
                            <TableCell>{vendor.id}</TableCell>
                            <TableCell>{vendor.pan_number}</TableCell>
                            <TableCell>{vendor.tin}</TableCell>
                            <TableCell>{vendor.vendor_name}</TableCell>
                            <TableCell>{vendor.owner_name}</TableCell>
                            <TableCell>{vendor.vendor_type}</TableCell>
                            <TableCell>{vendor.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ marginTop: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleVendorsdata}>
                    <RefreshIcon style={{ animation: "rotation 2s infinite linear" }} />
                    Refresh
                </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(Index);
