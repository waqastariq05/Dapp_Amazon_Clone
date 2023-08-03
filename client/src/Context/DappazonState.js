import { useEffect, useState } from "react";
import DappazonContext from "./DappazonContext";
import DappazonContract from "../artifacts/contracts/ECommerce.sol/ECommerce.json"
const ethers = require("ethers")

const DappazonState = (props) => {
    const [contract, setContract] = useState(null)
    const [provider, setProvider] = useState(null)
    const [connected, setConnected] = useState(false);

    // ===================== Load Provider Data ======================
    useEffect(() => {
        const loadProvider = async () => {
            const { ethereum } = window;
            const provider = new ethers.BrowserProvider(ethereum);
            if (provider) {
                let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
                const dappazonContract = new ethers.Contract(contractAddress, DappazonContract.abi, provider)
                setContract(dappazonContract)
                setProvider(provider)
            }
        };
        loadProvider();
    }, [])

    // ===================== Connect To MetaMask ======================
    const [account, setAccount] = useState(null);
    const handleConnect = async () => {
        if (provider) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });

            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });

            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address)
            setConnected(true)
        } else {
            alert("Install MetaMask")
            setConnected(false);
        }
    }

    // ===================== Fetch Admin & Check Is Admin ======================
    const [admin, setAdmin] = useState(null);
    const getAdmin = async () => {
        const ad = await contract.admin();
        setAdmin(ad);
    }

    const [checkAdmin, setCheckAdmin] = useState(false)
    const isAdmin = async () => {
        if (provider) {
            if (admin === account) {
                setCheckAdmin(true)
            } else {
                setCheckAdmin(false)
            }
        }
    }

    // ===================== Fetch Categories ======================
    const [category, setCategory] = useState([]);
    const getCategory = async () => {
        const cate = await contract.getCategory();
        setCategory(cate);
    }

    // ===================== Fetch Products ======================
    const [items, setItems] = useState([]);
    const getProduct = async () => {
        const item = await contract.getProduct();
        setItems(item);
    }

    // ===================== Fetch Orders ======================
    const [orders, setOrders] = useState([]);
    const getOrder = async () => {
        const ord = await contract.getOrderList();
        setOrders(ord);
    }

    // ===================== Alert Function ======================
    const [alert, setAlert] = useState(null)
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 2500);
    }

    return (
        <DappazonContext.Provider
            value={{
                provider,
                contract,
                connected,
                isAdmin,
                checkAdmin,
                getAdmin,
                handleConnect,
                account,
                category,
                getCategory,
                items,
                getProduct,
                orders,
                getOrder,
                alert,
                showAlert,
            }}
        >
            {props.children}
        </DappazonContext.Provider>
    );
};

export default DappazonState;
