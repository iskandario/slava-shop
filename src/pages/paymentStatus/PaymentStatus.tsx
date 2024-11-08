import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from 'styled-components';
import { useBasket } from '../basket/BasketContext';

interface RouteParams {
  [key: string]: string | undefined;
}

const PaymentStatus = () => {
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'succeeded' | 'failed' | 'error'>('pending');
    const { orderId } = useParams<RouteParams>();
    const { clearBasket } = useBasket();

    // Функция для проверки статуса оплаты
    const pollPaymentStatus = useCallback(async () => {
        try {
            const response = await axios.get(`https://vyacheslavna.ru/check_payment_status.php?order_id=${orderId}`, {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            
            const status = response.data?.status;
            if (status) {
                setPaymentStatus(status);
                if (status === 'succeeded') {
                    clearBasket(); // Очистка корзины при успешной оплате
                }
            } else {
                setPaymentStatus('error');
            }
        } catch {
            setPaymentStatus('error');
        }
    }, [orderId, clearBasket]);

    useEffect(() => {
        // Устанавливаем интервал опроса только если статус 'pending'
        if (paymentStatus === 'pending' && orderId) {
            const intervalId = setInterval(pollPaymentStatus, 5000);

            // Очищаем интервал при успешной оплате или ошибке
            return () => clearInterval(intervalId);
        }
    }, [paymentStatus, orderId, pollPaymentStatus]);

    const renderStatusMessage = () => {
        switch (paymentStatus) {
            case 'pending':
                return (
                    <>
                        <CircularProgress color="inherit" />
                        <p>Ожидание оплаты...</p>
                    </>
                );
            case 'succeeded':
                return (
                    <>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: '2rem' }} />
                        <p>Оплата прошла успешно!</p>
                    </>
                );
            case 'failed':
                return (
                    <>
                        <ErrorOutlineIcon style={{ color: 'red', fontSize: '2rem' }} />
                        <p>Оплата не удалась.</p>
                    </>
                );
            case 'error':
            default:
                return (
                    <>
                        <ErrorOutlineIcon style={{ color: 'red', fontSize: '2rem' }} />
                        <p>Ошибка при получении статуса. Попробуйте позже.</p>
                    </>
                );
        }
    };

    return (
        <StyledBox>
            <Typography variant="h4" component="h1" gutterBottom>
                Статус оплаты
            </Typography>
            {renderStatusMessage()}
        </StyledBox>
    );
};

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    text-align: center;
    padding: 2rem;
    font-family: "Fira Mono", monospace;
    font-weight: 300;
    & p {
        margin-top: 20px;
        font-size: 1.2rem;
    }
`;

export default PaymentStatus;