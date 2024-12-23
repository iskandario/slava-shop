import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useBasket } from '../basket/BasketContext';
import BackButton from "../../components/BackButton";

interface RouteParams {
  [key: string]: string | undefined;
}

const PaymentStatus = () => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'succeeded' | 'failed' | 'error'>('pending');
  const { orderId } = useParams<RouteParams>();
  const { clearBasket } = useBasket();

  // Poll payment status
  const pollPaymentStatus = useCallback(async () => {
    try {
      const response = await axios.get(`https://vyacheslavnabrand.ru/check_payment_status.php?order_id=${orderId}`, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      const status = response.data?.status;
      if (status) {
        setPaymentStatus(status);
        if (status === 'succeeded') {
          clearBasket(); // Clear the basket on successful payment
        }
      } else {
        setPaymentStatus('error');
      }
    } catch {
      setPaymentStatus('error');
    }
  }, [orderId, clearBasket]);

  useEffect(() => {
    if (paymentStatus === 'pending' && orderId) {
      const intervalId = setInterval(pollPaymentStatus, 5000);

      return () => clearInterval(intervalId);
    }
  }, [paymentStatus, orderId, pollPaymentStatus]);

  const renderStatusMessage = () => {
    switch (paymentStatus) {
      case 'pending':
        return (
          <MessageWrapper>
            <p>Ожидание оплаты...</p>
          </MessageWrapper>
        );
      case 'succeeded':
        return (
          <StatusWrapper>
           <TitleWrapper>
            <Title>Оплата прошла <br></br>успешно</Title>
            <CheckMark />
          </TitleWrapper>
            <Message>
              Благодарим Вас за покупку!<br />
              Мы соберем этот заказ с огромной любовью и заботой!
            </Message>
          </StatusWrapper>
        );
      case 'failed':
        return (
          <StatusWrapper>
             <TitleWrapper>
            <Title>Оплата  <br></br>не прошла</Title>
            <CrossMark />
          </TitleWrapper>
            <Message>Попробуйте вернуться и повторить попытку еще раз!</Message>
          </StatusWrapper>
        );
      case 'error':
      default:
        return (
          <StatusWrapper>
            <Title>Ошибка</Title>
            <CrossMark />
            <Message>Произошла ошибка. Пожалуйста, попробуйте позже.</Message>
          </StatusWrapper>
        );
    }
  };

  return (
    <Container>
        <ButtonWrap>
      <BackButton />
      </ButtonWrap>
      {renderStatusMessage()}
    </Container>
  );
};

export default PaymentStatus;


const ButtonWrap = styled.div`
margin-bottom: 2vw;
`                                           

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем по горизонтали */
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
  padding: 2rem;
  font-family: 'Fira Mono', monospace;
  font-weight: 300;
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MessageWrapper = styled.div`
  font-size: calc(1vw + 10px);
  font-family: 'Fira Mono', monospace;
  color: #333;
`;

const Title = styled.h2`
  font-family: 'NEXT ART', sans-serif;
  font-size: calc(2vw + 10px);
  font-weight: 700;
`;

const Message = styled.p`
  font-size: calc(1vw + 10px);
  font-family: 'Fira Mono', monospace;
  font-weight: 300;
  color: #555;
`;

const CheckMark = styled.div`
  width: 12vw; /* Увеличиваем размер */
  height: 12vw;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: #51C49B; /* Цвет галочки */
    border-radius: 4px; /* Делаем линии более толстыми */
  }

  &::before {
    width: 38%; /* Ширина левой части галочки */
    height: 10%; /* Толщина */
    transform: rotate(45deg);
    top: 58%;
    left: 12%; /* Сдвигаем левую часть левее */
  }

  &::after {
    width: 60%; /* Ширина правой части галочки */
    height: 10%; /* Толщина */
    transform: rotate(-45deg);
    top: 50%;
    left: 30%;
  }

  @media (max-width: 768px) {
    width: 24vw; /* Увеличиваем размер для мобильных устройств */
    height: 24vw;

    &::before,
    &::after {
      border-radius: 5px; /* Делаем толще */
    }
  }
`;

const CrossMark = styled.div`
  width: 12vw; /* Увеличиваем размер */
  height: 12vw;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: #f44336; /* Цвет крестика */
    border-radius: 4px; /* Делаем линии более толстыми */
  }

  &::before {
    width: 80%; /* Ширина линии */
    height: 10%; /* Толщина */
    transform: rotate(45deg);
    top: 50%;
    left: 10%;
  }

  &::after {
    width: 80%; /* Ширина линии */
    height: 10%; /* Толщина */
    transform: rotate(-45deg);
    top: 50%;
    left: 10%;
  }

  @media (max-width: 768px) {
    width: 24vw; /* Увеличиваем размер для мобильных устройств */
    height: 24vw;

    &::before,
    &::after {
      border-radius: 5px; /* Делаем толще */
    }
  }
`;