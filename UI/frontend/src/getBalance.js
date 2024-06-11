import React from 'react'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
//import { ethers } from 'ethers'
import {  Contract } from 'ethers'
import { BrowserProvider } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { providers } from 'ethers'

const USDTAddress = '0x617f3112bf5397D0467D315cC709EF968D9ba546'

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
  'event Transfer(address indexed from, address indexed to, uint amount)'
]

function Components() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function getBalance() {
    try {
      if (!isConnected) throw new Error('User disconnected')

      const ethersProvider = new providers.Web3Provider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const USDTContract = new Contract(USDTAddress, USDTAbi, signer)
      const USDTBalance = await USDTContract.balanceOf(address)

      console.log(formatUnits(USDTBalance, 18))
    } catch (error) {
      console.error('Error getting balance:', error.message)
      // Display an error message to the user or handle the error in another way
      alert(`Error getting balance: ${error.message}`)
    }
  }

  return <button onClick={getBalance}>Get User Balance</button>
}

export default Components