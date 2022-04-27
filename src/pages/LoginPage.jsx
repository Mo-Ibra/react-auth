import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        const data = { email, password };

        await axios.post('https://ttmg-backend.herokuapp.com/api/auth/staffLogin', data).then(res => {

            // Register Success
            if (res.status === 200) {
                toast.success('You has been logged in successfuly');
                setLoading(false);
                setTimeout(() => {
                    window.location.href = '/auth';
                }, 3000)
            } else {
                toast.error('Something went wrong please try again later.');
                setLoading(false);
            }

        }).catch(err => {

            // Error
            let status = err.response.status;
            switch (status) {
                case 400:
                    let errors = err.response.data.errors;
                    errors.forEach(error => {
                        toast.error(error.msg);
                    });
                    setLoading(false);
                    break;
                case 401:
                    toast.error('Email or Password is Incorrect');
                    setLoading(false);
                    break;
                default:
                    setLoading(false);
            }
        });
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                boxShadow: '4px 6px 16px #eee',
                padding: '10px',
                border: '1px solid #ddd',
                margin: '20px auto'
            }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {
                        loading ? (
                            <LoadingButton
                                loading
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </LoadingButton>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                        )
                    }
                </Box>
            </Box>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
}