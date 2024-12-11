import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from ".././_globalStyles/theme";


const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(true);

  useEffect(() => {
    // Проверка, есть ли возможность вернуться назад
    if (window.history.length <= 2 || location.key === "default") {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [location]);

  const handleClick = () => {
    if (canGoBack) {
      navigate(-1); // Возврат на предыдущую страницу
    } else {
      navigate('/'); // Переход на главную
    }
  };

  return <StyledButton onClick={handleClick}>Вернуться/</StyledButton>;
};

const StyledButton = styled.button`  
  font-family: "Fira Mono", monospace;
  text-decoration: none;
  color: ${theme.mainTextColor};
  border: none;
  font-weight: 500;
  background: none;
  line-height: 1.8;
  border-bottom: 0.9px solid #666; /* Серое подчеркивание */
  font-size: calc(1vw + 10px);
  cursor: pointer;

  &:hover {
      background-color: transparent;
      color: ${theme.secondaryTextColor};
      box-shadow: none;
    }
`;

export default BackButton;