import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import ApeInCreditScoreWindow from './components/ApeInCreditScoreWindow';
import styled from 'styled-components';
import TransactionsWindow from './components/TransactionsWindow';
import { styleReset, 
} from 'react95';
import myImage from './assets/vaporwaveBackground.jpg';
// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import Web3 from 'web3';
let metaMaskAddress;
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.eth.getAccounts().then(res => {metaMaskAddress = res[0]})
.then(() => console.log(metaMaskAddress));




const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

const Background = styled.div`
  background-image: url(${myImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

const App = () => {
  const [window, setWindow] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState(null);
  const getTransactionHistory = () => {
    return transactionHistory;
  }
  return(
  <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <Background>
        {window === 0 ? <ApeInCreditScoreWindow metaMaskAddress={metaMaskAddress} setWindow={setWindow} setTransactionHistory={setTransactionHistory} web3={web3}/>
         : <TransactionsWindow metaMaskAddress={metaMaskAddress} transactionHistory={getTransactionHistory} web3={web3}/>}
      </Background>
    </ThemeProvider>
  </div>
)};

export default App;