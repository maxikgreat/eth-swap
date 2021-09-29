import {useEffect, useReducer} from 'react';
import {Header} from './components/Header';
import {init} from './web3/init';
import {initialAppState, appReducer} from './state/reducer';
import {fetchAddress, fetchBalance, setContracts, setInitialLoading, setPurchaseLoading} from './state/actions';
import {getAppContracts} from './web3/createContact';
import {Swapper} from './components/Swapper';
import {buyTokens, sellTokens} from './web3/functions';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    dispatch(setInitialLoading(true));

    init()
      .then(() => fetchAddress())
      .then(dispatchData => {
        dispatch(dispatchData)
        return Promise.resolve()
      })
      .then(() => getAppContracts())
      .then((contracts) => dispatch(setContracts(contracts)))
      .catch(() => alert('Something went wrong!'))
      .finally(() => dispatch(setInitialLoading(false)))

  }, []);

  useEffect(() => {
    const Token = state.contracts.Token;
    const EthSwap = state.contracts.EthSwap;

    const address = state.address;

    if (!Token || !EthSwap || !address) {
      return;
    }

    fetchBalance(address, Token, EthSwap)
      .then(data => dispatch(data))

  }, [state.contracts, state.address]);

  const onSubmitHandler = async (value, isPurchase) => {
    if (!value) {
      return;
    }

    dispatch(setPurchaseLoading(true));

    try {
      if (isPurchase) {
        await buyTokens(state, dispatch, value);
        return;
      }

      await sellTokens(state, dispatch, value);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setPurchaseLoading(false));
    }
  }

  const {balance, loading: {initial: initialLoading, purchase: purchaseLoading}} = state;

  return (
    <>
      <Header address={state.address} />
      <main>
        {initialLoading && <span>Loading app...</span>}
        {!initialLoading && (!balance.tokens || !balance.eth || !balance.exchangeRate) && (
          <span>Some error occured</span>
        )}
        {!initialLoading && balance.tokens && balance.eth && balance.exchangeRate && (
          <Swapper balance={balance} onSubmitHandler={onSubmitHandler} purchaseLoading={purchaseLoading} />
        )}
      </main>
    </>
  );
}

export default App;
