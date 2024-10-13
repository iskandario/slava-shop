import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from "styled-components";
import {theme} from "../../_globalStyles/theme";

export default function Loading() {
	return (
		<StyledBox>
			<CircularProgress sx={{color: theme.mainTextColor}}/>
		</StyledBox>
	);
}

const StyledBox = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
  background-color: rgba(245, 245, 245, 0.3); /* Полупрозрачный белый фон */
  backdrop-filter: blur(10px);  /* Эффект размытия фона */
  -webkit-backdrop-filter: blur(10px); /* Для поддержки в WebKit браузерах */
	flex-grow: 1;
`