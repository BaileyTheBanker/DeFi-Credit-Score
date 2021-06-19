import React from 'react'
import styled from 'styled-components';
import configData from '../config.json';
import pancakeswapLogo from '../assets/pancakeswapLogo.png';
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
  Panel,
} from 'react95';

const Wraper = styled.div`
    padding: 5rem;
    display: flex;
    justify-content: center;
`;
const TransactionsWindow = (props) => {
    let transactionsWithWantedAddresses = [];
    props.transactionHistory().forEach(function(transaction){
        for (const property in configData) {
            if(transaction.to === configData[property]){
                transactionsWithWantedAddresses.push(transaction);
            }
        }
    });
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