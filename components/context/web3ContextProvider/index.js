import React, { createContext, useContext } from "react";
import { contractAddress, abi } from "./contract";
// import { ethers } from "ethers";
import { ethers } from "ethers";

const Web3Context = createContext();

export function useWeb3Context() {
  return useContext(Web3Context);
}
export function Web3ContextProvider({ children }) {
  // const infuraApiKey = process.env.INFURA_API_KEY;
  // // const provider = new ethers.JsonRpcProvider(`${infuraApiKey}`);
  // // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner;
  // // const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
  // const contract = new ethers.Contract(contractAddress, abi, provider);

  const getContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum); // A connection to the Ethereum network
      var signer = await provider.getSigner(); // Holds your private key and can sign things
      const Contract = new ethers.Contract(contractAddress, abi, signer);
      return Contract;
    } else {
      alert("No wallet detected");
    }
  };

  const getDocuments = async () => {
    const deContract = await getContract();
    return deContract.getDocuments();
  };

  const uploadfile = async (file) => {
    try {
    const deContract = await getContract();
      await deContract.addDoc(file);
    } catch (error) {
      alert("Error Uploading File");
      console.log(error);
    }
  };

  const sendDoc = async (to, file) => {
    try {
    const deContract = await getContract();
    await deContract.sendDoc(to, file);
    } catch (error) {
      alert("Error Sending Files");
      console.log(error);
    }
  };
  const deleteDoc = async (file) => {
    try {
    const deContract = await getContract();
    await deContract.deleteDoc(file);
    } catch (error) {
      alert("Error Deleting Files");
      console.log(error);
    }
  };

  return (
    <Web3Context.Provider value={{ uploadfile, getDocuments, deleteDoc }}>
      {children}
    </Web3Context.Provider>
  );
}
