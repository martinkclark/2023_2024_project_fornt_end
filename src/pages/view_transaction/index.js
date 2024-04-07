
import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, InputAdornment } from '@material-ui/core';
import { Refresh as RefreshIcon, Search as SearchIcon } from '@material-ui/icons';
import { useAuth } from 'src/hooks/useAuth';
import axios from 'axios';
import Modal_Component from './components/Modal_Component';

function index() {
    const url = process.env.APIURL; 

    const { vendor_transaction_data, handle_vendor_transaction } = useAuth([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [editableRow, setEditableRow] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [open,setOpen] = useState(false);
    const [vendorTransactionData,setVendorTransactionData] = useState({});

    useEffect(() => {
        handle_vendor_transaction();
        console.log('updated data chaing use effect');
    }, [updatedData]);

    useEffect(() => {
        const searchData = vendor_transaction_data.filter(transaction =>
            transaction.vendor_id.toString().includes(searchQuery) || 
            transaction.PAN.includes(searchQuery)
        );
        setFilteredData(searchData);
    }, [searchQuery, vendor_transaction_data, updatedData]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleUpdate = async (id) => {
        try {
            // Send PUT request to your backend API
            console.log('updatedData:', updatedData);
            const response = await axios.put(`${url}vendor-transactions/${id}`, updatedData);
            await handle_vendor_transaction();
            console.log('Transaction updated:', response.data);
            // Handle success
        } catch (error) {
            console.error('Error updating transaction:', `${url}vendor-transactions/${id}`, 'message', error);
            // Handle error
        }
        console.log('Updating transaction with ID:', id);
        setEditableRow(null);
    };

    const updatedDataChange = (event) => {
        setUpdatedData({ ...updatedData, [event.target.name]: event.target.value });
    };
    const handleEdit = (id) => {
        console.log('vendor_transaction_data:', vendor_transaction_data);
        const foundTransaction = vendor_transaction_data.find(transaction => transaction.id === id);
        console.log('foundTransaction:', foundTransaction);
        setEditableRow(id);
        setUpdatedData(foundTransaction);
    };
    

    return (
        <div>
            <TextField
                variant="outlined"
                label="Search PAN or Vendor ID"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <Modal_Component  open = {open} setOpen={setOpen} vendoTransactionData={vendorTransactionData} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Vendor ID</TableCell>
                        <TableCell>PAN NUMBER</TableCell>
                        <TableCell>Financial Year</TableCell>
                        <TableCell>Date Of Payment</TableCell>
                        <TableCell>Invoice Number</TableCell>
                        <TableCell>Gross Amount</TableCell>
                        <TableCell>IT Taxable Amount</TableCell>
                        <TableCell>Section Code</TableCell>  
                        <TableCell>Updated At</TableCell> {/* New column for update button */}
                        <TableCell>Update</TableCell> {/* New column for update button */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((transaction) => (
                        <TableRow key={transaction.id} onClick = {
                            () => {
                                setOpen(true);
                                setVendorTransactionData(transaction);
                            }
                        
                        }>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{transaction.vendor_id}</TableCell>
                            <TableCell>{transaction.PAN}</TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <TextField 
                                        value={updatedData.financial_year} 
                                        onChange={updatedDataChange} 
                                        name="financial_year" 
                                    />
                                ) : (
                                    transaction.financial_year
                                )}
                            </TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <TextField 
                                        value={updatedData.date_of_payment} 
                                        onChange={updatedDataChange} 
                                        name="date_of_payment" 
                                    />
                                ) : (
                                    transaction.date_of_payment
                                )}
                            </TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <TextField 
                                        value={updatedData.invoice_number} 
                                        onChange={updatedDataChange} 
                                        name="invoice_number" 
                                    />
                                ) : (
                                    transaction.invoice_number
                                )}
                            </TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <TextField 
                                        value={updatedData.gross_amount} 
                                        onChange={updatedDataChange} 
                                        name="gross_amount" 
                                    />
                                ) : (
                                    transaction.gross_amount
                                )}
                            </TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <TextField 
                                        value={updatedData.it_taxable_amount} 
                                        onChange={updatedDataChange} 
                                        name="it_taxable_amount" 
                                    />
                                ) : (
                                    transaction.it_taxable_amount
                                )}
                            </TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <TextField 
                                        value={updatedData.section_code} 
                                        onChange={updatedDataChange} 
                                        name="section_code" 
                                    />
                                ) : (
                                    transaction.section_code
                                )}
                            </TableCell>
                            <TableCell>{new Date(transaction.updated_at).toLocaleString()}</TableCell>

                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleUpdate(transaction.id)}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleEdit(transaction.id)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div style={{ marginTop: '10px' }}>
                <Button variant="contained" color="primary" onClick={handle_vendor_transaction}>
                    <RefreshIcon style={{ animation: "rotation 2s infinite linear" }} />
                    Refresh
                </Button>
            </div>
        </div>
    );
}

export default index;
