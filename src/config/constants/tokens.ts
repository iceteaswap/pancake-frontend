import { ChainId, Token } from '@pancakeswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const mainnetTokens = {
  weth: new Token(
    MAINNET,
    '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  // eth here points to the weth contract. Wherever the currency ETH is required, conditional checks for the symbol 'ETH' can be used
  eth: new Token(MAINNET, '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', 18, 'ETH', 'ETH', 'https://ethereum.org/'),
  busd: new Token(
    MAINNET,
    '0x461d52769884ca6235B685EF2040F47d30C94EB5',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  dai: new Token(
    MAINNET,
    '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  usdt: new Token(
    MAINNET,
    '0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d',
    18,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  usdc: new Token(
    MAINNET,
    '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
    18,
    'USDC',
    'USD Coin',
    'https://www.centre.io/usdc',
  )
}

export const testnetTokens = {
  weth: new Token(
    MAINNET,
    '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),
  // eth here points to the weth contract. Wherever the currency ETH is required, conditional checks for the symbol 'ETH' can be used
  eth: new Token(MAINNET, '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', 18, 'ETH', 'ETH', 'https://ethereum.org/'),
  busd: new Token(
    MAINNET,
    '0x461d52769884ca6235B685EF2040F47d30C94EB5',
    18,
    'BUSD',
    'Binance USD',
    'https://www.paxos.com/busd/',
  ),
  dai: new Token(
    MAINNET,
    '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  usdt: new Token(
    MAINNET,
    '0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d',
    18,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  usdc: new Token(
    MAINNET,
    '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
    18,
    'USDC',
    'USD Coin',
    'https://www.centre.io/usdc',
  )
}

const tokens = (): TokenList => {
  const chainId = process.env.REACT_APP_CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {})
  }

  return mainnetTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()
