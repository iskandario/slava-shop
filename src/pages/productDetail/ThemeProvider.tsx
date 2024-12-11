import { createTheme } from '@mui/material/styles';

const themes = createTheme({
  breakpoints: {
    values: {
      xs: 0,  // Для устройств меньшего размера
      sm: 600,
      md: 768, // Изменяем точку md с 900px на 768px
      lg: 1200,
      xl: 1536,
    },
  },
});

export default themes;