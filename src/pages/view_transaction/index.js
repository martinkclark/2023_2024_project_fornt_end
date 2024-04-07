
// import React, { useState, useEffect } from 'react';
// import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, InputAdornment } from '@material-ui/core';
// import { Refresh as RefreshIcon, Search as SearchIcon } from '@material-ui/icons';
// import { useAuth } from 'src/hooks/useAuth';

// function Index() {
//     const { vendor_transaction_data, handle_vendor_transaction } = useAuth([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredData, setFilteredData] = useState([]);

//     useEffect(() => {
//         handle_vendor_transaction();
//     }, []);

//     useEffect(() => {
//         const searchData = vendor_transaction_data.filter(transaction =>
//             transaction.id.toString().includes(searchQuery) || transaction.vendor_id.toString().includes(searchQuery) || transaction.PAN.includes(searchQuery) 
//         );
//         setFilteredData(searchData);
//     }, [searchQuery, vendor_transaction_data]);

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     return (
//         <div>

//             <TextField
//                 variant="outlined"
//                 label="Search"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//             />

//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Transaction ID</TableCell>
//                         <TableCell>Vendor ID</TableCell>
//                         <TableCell>PAN NUMBER</TableCell>
//                         <TableCell>Financial Year</TableCell>
//                         <TableCell>Date Of Payment</TableCell>
//                         <TableCell>Invoice Number</TableCell>
//                         <TableCell>Gross Amount</TableCell>
//                         <TableCell>IT Taxable Amount</TableCell>
//                         <TableCell>Section Code</TableCell>  
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {filteredData.map((transaction) => (
//                         <TableRow key={transaction.id}>
//                             <TableCell>{transaction.id}</TableCell>
//                             <TableCell>{transaction.vendor_id}</TableCell>
//                             <TableCell>{transaction.PAN}</TableCell>
//                             <TableCell>{transaction.financial_year}</TableCell>
//                             <TableCell>{transaction.date_of_payment}</TableCell>
//                             <TableCell>{transaction.invoice_number}</TableCell>
//                             <TableCell>{transaction.gross_amount}</TableCell>
//                             <TableCell>{transaction.it_taxable_amount}</TableCell>
//                             <TableCell>{transaction.section_code}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>

//             <div style={{ marginTop: '10px' }}>
//                 <Button variant="contained" color="primary" onClick={handle_vendor_transaction}>
//                     <RefreshIcon style={{ animation: "rotation 2s infinite linear" }} />
//                     Refresh
//                 </Button>
//                 <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={() => handleUpdate(transaction.id)}>
//                     Update
//                 </Button>
                      
//             </div>
//         </div>
//     );
// }

// export default Index;


import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, InputAdornment } from '@material-ui/core';
import { Refresh as RefreshIcon, Search as SearchIcon } from '@material-ui/icons';
import { useAuth } from 'src/hooks/useAuth';
import axios from 'axios';


function Index() {
    const url = process.env.APIURL; 

    const { vendor_transaction_data, handle_vendor_transaction , handleVendorTransactionFormChange, vendor_transaction_form} = useAuth([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [editableRow, setEditableRow] = useState(null);
    
    useEffect(() => {
        handle_vendor_transaction();
    }, []);

    useEffect(() => {
        const searchData = vendor_transaction_data.filter(transaction =>
            transaction.id.toString().includes(searchQuery) || transaction.vendor_id.toString().includes(searchQuery) || transaction.PAN.includes(searchQuery) 
        );
        setFilteredData(searchData);
    }, [searchQuery, vendor_transaction_data]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleUpdate = async (id) => {
            // Find the transaction with the given ID
    const transactionToUpdate = vendor_transaction_form;
    
    // Example updated data (you can modify this as needed)
    const updatedData = {
        // Update fields as needed
        // For example:
        vendor_id: transactionToUpdate.vendor_id,
        PAN: transactionToUpdate.PAN,
        financial_year: transactionToUpdate.financial_year,
        date_of_payment: transactionToUpdate.date_of_payment,
        invoice_number: transactionToUpdate.invoice_number,
        gross_amount: transactionToUpdate.gross_amount,
        it_taxable_amount: transactionToUpdate.it_taxable_amount,
        section_code: transactionToUpdate.section_code,
        // Add fields you want to update
    };

    try {
        // Send PUT request to your backend API
        console.log('updatedData :',updatedData);
        const response = await axios.put(`${url}vendor-transactions/${id}`, updatedData);
        console.log('Transaction updated:', response.data);
        // Handle success
    } catch (error) {
        console.error('Error updating transaction:',`${url}vendor-transactions/${id}`,'message', error);
        // Handle error
    }
    console.log('Updating transaction with ID:', id);
    setEditableRow(null);
    };


    const handleEdit = (id) => {
        setEditableRow(id);
    };

    return (
        <div>

            <TextField
                variant="outlined"
                label="Search"
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
                        <TableCell>Action</TableCell> {/* New column for update button */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.id}  /> : transaction.id}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.vendor_id } onChange={handleVendorTransactionFormChange} name='vendor_id' /> : transaction.vendor_id }</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.PAN } onChange={handleVendorTransactionFormChange}  /> : transaction.PAN}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.financial_year}onChange={handleVendorTransactionFormChange} name='financial_year'  /> : transaction.financial_year}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.date_of_payment}onChange={handleVendorTransactionFormChange} name='date_of_payment' /> : transaction.date_of_payment}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.invoice_number}onChange={handleVendorTransactionFormChange} name='invoice_number' /> : transaction.invoice_number}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.gross_amount} onChange={handleVendorTransactionFormChange} name ='gross_amount' /> : transaction.gross_amount}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.it_taxable_amount}onChange={handleVendorTransactionFormChange} name = "it_taxable_amount" /> : transaction.it_taxable_amount}</TableCell>
                            <TableCell>{editableRow === transaction.id ? <TextField defaultValue={transaction.section_code}onChange={handleVendorTransactionFormChange} name="section_code" /> : transaction.section_code}</TableCell>
                            <TableCell>
                                {editableRow === transaction.id ? (
                                    <Button variant="contained" color="primary" onClick={() => handleUpdate(transaction.id)}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(transaction.id)}>
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

export default Index;
