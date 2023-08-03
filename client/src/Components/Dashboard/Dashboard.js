import React, { useContext, useEffect, useState } from 'react'
import '../Dashboard/Dashboard.css'
import human from '../../assets/human.png'
import card from '../../assets/card.png'
import DappazonContext from '../../Context/DappazonContext'
import { ethers } from 'ethers';

const Dashboard = () => {
    const contex = useContext(DappazonContext);
    const { provider, account, contract, showAlert } = contex;
    let address = contract.target;

    const [balance, setBalance] = useState(null)
    const getBalance = async () => {
        const bal = await provider.getBalance(address);
        const cost = ethers.formatEther(bal);
        setBalance(cost)
    }

    const [transactionCount, setTransactionCount] = useState(null)
    const getTransactionCount = async () => {
        const tra = await provider.getTransactionCount(account)
        setTransactionCount(tra)
    }

    const [blockCount, setBlockCount] = useState(null)
    const getBlockCount = async () => {
        const block = await provider.getBlockNumber()
        setBlockCount(block)
    }

    useEffect(() => {
        provider && getBalance();
        provider && getBlockCount();
        account && getTransactionCount();
    }, [provider, account])

    const handleWithdraw = async () => {
        try {
            const signer = await provider.getSigner();
            let trans = await contract.connect(signer).withdraw();
            await trans.wait();
            showAlert("Balance is withdraw successfully.", "success")
        } catch (error) {
            showAlert("Balance is not withdraw successfully.", "success")
        }
    }

    return (
        <div className='dashboard'>
            <div className='container'>
                <div class="top">
                    <h2>Dashboard</h2>
                </div>
                <div className='row py-3'>
                    <div className="col-md-8">
                        <div class="card">
                            <div class="row align-items-end">
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h2 class="card-title">Welcome Admin</h2>
                                        <h4>Account: <span>{account ? account : "Not Connected"}</span></h4>
                                        <p class="card-text">Balance: {balance} Eth</p>
                                        <button className="btn" disabled={balance <= 0} onClick={handleWithdraw}>Withdraw</button>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img src={human} class="img-fluid" alt="human" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 transactionCard">
                        <div class="card">
                            <img src={card} class="card-img-top" alt="cardImg" />
                            <div class="card-body">
                                <h5 class="card-title">transaction</h5>
                                <p class="card-text">{transactionCount}</p>
                                <p class="card-subText">daily transaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 transactionCard">
                        <div class="card">
                            <img src={card} class="card-img-top" alt="cardImg" />
                            <div class="card-body">
                                <h5 class="card-title">Blocks</h5>
                                <p class="card-text">{blockCount}</p>
                                <p class="card-subText">Total Blocks</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
