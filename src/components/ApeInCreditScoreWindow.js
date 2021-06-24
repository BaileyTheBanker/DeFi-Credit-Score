import React, { useState } from 'react';
import myGif from '../assets/stars.gif';
import styled from 'styled-components';
import { 
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Toolbar,
  Panel,
  Hourglass,
  LoadingIndicator,
  Tooltip,
} from 'react95';

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  justify-content: center;
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ___CSS_0___;
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    width: 400px;
    height: 600px;
    
  }
  .window:nth-child(2) {
    margin: 2rem;
  }
  .window-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .screen {
    width: 350px;
    height:250px;
    margin: 10px;
    background-image: url(${myGif});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .screen-text {
    display: flex;
    justify-content: center;
    color: white;
    font-size: 50px;
  }
 
  .apeinButton {
    width: 100px;
    display: flex;
    justify-content: center;
    margin: 15px;
  }
`;

const ApeInCreditScoreWindow = (props) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    let metaMaskAddress;
    props.web3.eth.getAccounts().then(res => {metaMaskAddress = res[0]}).then(() => {
      fetch(`https://api.bscscan.com/api?module=account&action=txlist&address=${metaMaskAddress}&startblock=1&endblock=99999999&sort=asc&apikey=95ISRBPUWI8RU2DE9QJIVPEXHAADXH46EV`)
      .then(res => res.json())
      .then(data => {
        props.setTransactionHistory(data.result);
        props.setWindow(1);
      })
    }
    );
  }
  return(
  <div>
    <Wrapper>
      <Window resizable className='window'>
        <WindowHeader className='window-header'>
          <span>Ape_Defi_CreditScore.exe</span>
          <Button>
            <span className='close-icon' />
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button variant='menu' size='sm'>
            File
          </Button>
          <Button variant='menu' size='sm'>
            Edit
          </Button>
          <Button variant='menu' size='sm' disabled>
            Save
          </Button>
        </Toolbar>
        <WindowContent className='window-content'>
          <Panel variant='well' className='screen'>
            <h1 className='screen-text'>Ape into</h1>
            <h1 className='screen-text'>Credit Score</h1>
          </Panel>
          <Panel style={{ margin: '10px', padding: '0.5rem', lineHeight: '1.5'}}>
            Has Ape-ing into the craziest apps allowed you access to credit? Ape in to find out.
          </Panel>
          <Tooltip text='Check Credit!' enterDelay={100} leaveDelay={500}>
            <Button className='apeinButton' onClick={handleClick}>
              <h1>APE IN</h1>
            </Button>
          </Tooltip>
          {loading ? <div style={{display: 'flex'}}><p>loading...</p><Hourglass size={18}/></div> : null}
          {loading ? <LoadingIndicator isLoading/> : null}
        </WindowContent>
      </Window>
    </Wrapper>       
  </div>
)};

export default ApeInCreditScoreWindow;