import React, {useState} from 'react'
import styled from 'styled-components';
import configData from '../config.json';
import pancakeswapLogo from '../assets/pancakeswapLogo.png';
import acryptosLogo from '../assets/acryptosLogo.png';
import ellipsisLogo from '../assets/ellipsisLogo.png';
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
  NumberField,
} from 'react95';

const Wraper = styled.div`
    padding: 5rem;
    display: flex;
    justify-content: center;

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
    const exchangeLogo = [pancakeswapLogo, acryptosLogo, ellipsisLogo]
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
        <div>
            <Wraper>
                <Window>
                    <WindowContent>
                        <Fieldset label='Your address'>
                            {props.metaMaskAddress}
                        </Fieldset>
                        <br/>
                        {transactionsWithWantedAddresses.length === 0 ? <Fieldset label='Notice!'>you have no transactions of interest</Fieldset> : null}
                        <br/>
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

                            </Avatar>
                            <div>
                                BBL dues paid:
                                <Panel variant='well' style={{ margin: '10px', width: '55px' }}>0</Panel>
                            </div>
                        </Panel>
                    </WindowContent>
                </Window>
                <Window style={{}}>
                    <WindowHeader>Transactions.exe</WindowHeader>
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
            </Wraper>
        </div>
    )
};

export default TransactionsWindow;