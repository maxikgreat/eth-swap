import {SET_ADDRESS, SET_BALANCE, SET_CONTRACTS, SET_INITIAL_LOADING, SET_PURCHASE_LOADING} from './types';

export const initialAppState = {
  loading: {
    initial: false,
    purchase: false,
  },
  address: null,
  balance: {
    tokens: null,
    eth: null,
    exchangeRate: null,
  },
  contracts: {
    EthSwap: null,
    Token: null,
  },
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      }

    case SET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      }

    case SET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload
      }

    case SET_INITIAL_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          initial: action.payload,
        }
      }

    case SET_PURCHASE_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          purchase: action.payload,
        }
      }

    default:
      return state;
  }
}
