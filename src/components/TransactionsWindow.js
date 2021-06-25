import React, {useState} from 'react'
import styled from 'styled-components';
import configData from '../config.json';
import pancakeswapLogo from '../assets/pancakeswapLogo.png';
import acryptosLogo from '../assets/acryptosLogo.png';
import ellipsisLogo from '../assets/ellipsisLogo.png';
import BBLLogo from '../assets/LogoSized.png';
import AboutWindow from '../components/AboutWindow';
import { 
  Window,
  WindowContent,
  WindowHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Cutout,
  Fieldset,
  Checkbox,
  Avatar,
  Panel,
  Toolbar,
  Button,
} from 'react95';

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 32px;
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
  margin: 25px;
  z-index: 1;
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

.exchangeCheckbox {
    display: flex;
    align-items: center;
    margin: 25px;
}
.exchangeLogo {
    margin: 5px;
}
`;

const TransactionsWindow = (props) => {
    let transactionsWithWantedAddresses = [];
    const exchanges = ['pancakeSwap', 'Acryptos', 'Ellipsis', 'BBL'];
    const exchangeLogo = [pancakeswapLogo, acryptosLogo, ellipsisLogo, BBLLogo]
    const [hasInteractedWithWantedAddress, setHasInteractedWithWantedAddress] = useState([]);

    try{
        props.transactionHistory().forEach(function(transaction){
            let i=0;
            for (const property in configData) {
                if(transaction.to === configData[property]){
                    transactionsWithWantedAddresses.push(transaction);
                    if(!hasInteractedWithWantedAddress[i]){
                        let newArray = [...hasInteractedWithWantedAddress];
                        newArray[i]=true;
                        setHasInteractedWithWantedAddress(newArray);
                    }
                }
                i++;
            }
        });
    } catch (error) {
        console.log(error);
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Wrapper>
            <div>
                {transactionsWithWantedAddresses.length === 0 ?
                <Window style={{width: '350px'}}>
                    <WindowHeader className='window-header'>
                        Notification_Center.exe
                        <Button>
                            <span className='close-icon' />
                        </Button>
                    </WindowHeader>
                    <WindowContent className='window-content'>
                        <Fieldset label='Notice!'>you have no transactions of interest</Fieldset>
                        {props.metaMaskAddress ? null : <Fieldset label='Notice!'>your MetaMask Wallet is not connected, please try again</Fieldset>}
                    </WindowContent>
                </Window>
                :
                null}
                {props.aboutOpen ? <AboutWindow/>: null}
            </div>
                <Window className='window'>
                    <WindowHeader className='window-header'>
                        Info.exe
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
                        <Panel shadow style={{ padding: '0.5rem', lineHeight: '1.5'}}>
                        <Panel variant='well' style={{ margin: '10px', padding: '0.5rem', lineHeight: '1.5'}}>If you want a line of credit, these should look familiar:</Panel>
                            <br/>
                            {exchanges.map((exchange, index) => {
                                return(
                                    <Fieldset
                                        key={index}
                                        className='exchangeCheckbox'
                                        disabled={!hasInteractedWithWantedAddress[index]}
                                        label={
                                            <Checkbox
                                            style={{ margin: 0 }}
                                            label={`${exchange}`}
                                            checked={hasInteractedWithWantedAddress[index]}
                                            disabled={!hasInteractedWithWantedAddress[index]}
                                            />
                                        }
                                        >
                                            <Avatar square size={50} className='exchangeLogo'>
                                                <img width={32} height={32} src={exchangeLogo[index]}/>
                                            </Avatar>
                                            <p>interacted with {exchange}</p>
                                    </Fieldset>
                                );
                            })}
                        </Panel>
                        <br/>
                        <Panel shadow style={{ display: 'flex',  margin: '10px', padding: '0.5rem', lineHeight: '1.5'}}>
                            <Avatar square size={50} className='exchangeLogo'>
                                <img src={BBLLogo} width={32} height={32}/>
                            </Avatar>
                            <div>
                                BBL dues paid:
                                <Panel variant='well' style={{ margin: '10px', width: '55px' }}>0</Panel>
                            </div>
                        </Panel>
                    </WindowContent>
                </Window >
                <Window style={{maxHeight: '700px'}}>
                    <WindowHeader className='window-header'>
                        Transactions.exe
                        <Button>
                            <span className='close-icon' />
                        </Button>
                    </WindowHeader>
                    <WindowContent>
                    <Cutout style={{ height: 600 }}>
                    <Table>
                        <TableHead>
                        <TableRow head>
                            <TableHeadCell>Exchange</TableHeadCell>
                            <TableHeadCell>Value</TableHeadCell>
                            <TableHeadCell disabled>Time stamp</TableHeadCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactionsWithWantedAddresses.map((value, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableDataCell style={{ textAlign: 'center' }}>{value.to === configData.pancakeSwapAddress ? <img width={16} height={16} src={pancakeswapLogo}/> : value.to}</TableDataCell>
                                        <TableDataCell>{props.web3.utils.fromWei(value.value, 'ether').substring(0,5)}</TableDataCell>
                                        <TableDataCell>{value.timeStamp}</TableDataCell>
                                    </TableRow>
                                );
                            })
                            }
                        </TableBody>
                    </Table>
                    </Cutout>
                    </WindowContent>
                </Window>
            </Wrapper>
        </div>
    )
};

export default TransactionsWindow;