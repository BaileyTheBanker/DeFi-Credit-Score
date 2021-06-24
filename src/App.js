import React, { useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import ApeInCreditScoreWindow from './components/ApeInCreditScoreWindow';
import styled from 'styled-components';
import TransactionsWindow from './components/TransactionsWindow';
import { 
  styleReset, 
  Button,
  AppBar,
  Bar,
} from 'react95';
import myImage from './assets/vaporwaveBackground.jpg';
import windowsLogo from './assets/windowsLogo.png'
// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import { connectMetamask, eagerlyConnectMetamask, getWeb3 } from 'eth-wallet-connector'
import Web3 from 'web3';




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
  let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const [window, setWindow] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [metaMaskAddress, setMetaMaskAddress] = useState(null);
  
  
  useEffect(() => {
    const connectEagerlyMetamask = async () => {
      const result = await eagerlyConnectMetamask();

      if (result) {
        // connected

        web3 = getWeb3(); // this retrieves the web3 instance from the wallet

        const accounts = await web3.eth.getAccounts();
        setMetaMaskAddress(accounts[0]);
        console.log(accounts);
      }
    }

    connectEagerlyMetamask();
  }, [])

  const handleConnectMetamask = async () => {
    const result = await connectMetamask();

    if (result) {
      // connected

      web3 = getWeb3(); // this retrieves the web3 instance from the wallet

      const accounts = await web3.eth.getAccounts();
      setMetaMaskAddress(accounts[0]);
      console.log(accounts);
    }
  }

  const getTransactionHistory = () => {
    return transactionHistory;
  }
  return(
  <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <Background>
      <AppBar style={{ padding: '6px'}}>
        <div style={{ display: 'flex' }}>
          <Button
            style={{ fontWeight: 'bold' }}
          >
            <img
              src={windowsLogo}
              alt='react95 logo'
              style={{ height: '20px', marginRight: 4 }}
            />
            Start
          </Button>
          <Bar size={35} />
          <Button style={{ fontWeight: 'bold' }} onClick={handleConnectMetamask}>Connect</Button>
          <Button style={{ fontWeight: 'bold' }}>About</Button>
          <Bar size={35} />
          </div>
    </AppBar>
        {window === 0 ? <ApeInCreditScoreWindow metaMaskAddress={metaMaskAddress} setWindow={setWindow} setTransactionHistory={setTransactionHistory} web3={web3}/>
         : <TransactionsWindow metaMaskAddress={metaMaskAddress} transactionHistory={getTransactionHistory} web3={web3}/>}
      </Background>
    </ThemeProvider>
  </div>
)};

export default App;