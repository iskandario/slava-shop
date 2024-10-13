import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(-1); // Возвращаемся на одну страницу назад
  }, [navigate]);

  return (
    <Button sx={{ textTransform: 'none' }} onClick={handleGoBack}>
      Вернуться
    </Button>
  );
};

export default BackButton;