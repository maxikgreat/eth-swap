import {useState} from 'react';
import './styles.css';

export const Swapper = ({balance, onSubmitHandler, purchaseLoading}) => {
  const [exchangeValue, setExchangeValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  const [isPurchaseAction, setIsPurchaseAction] = useState(true);

  const onChangeIsPurchaseAction = () => {
    setIsPurchaseAction(prevState => !prevState);
    setExchangeValue('');
    setConvertedValue('');
  }

  const onChangeExchangeValueHandler = ({target: {value}}) => {
    setExchangeValue(value);

    if (value === '') {
      setConvertedValue('');
      return;
    }

    if (isPurchaseAction) {
      setConvertedValue((Number(value) * balance.exchangeRate).toString());
      return;
    }

    setConvertedValue((Number(value) / balance.exchangeRate).toString());
  }

  const getValuesLabel = ({isInput}) => {
    if (isInput) {
      return isPurchaseAction ? 'ETH' : 'DAPP';
    }

    return isPurchaseAction ? 'DAPP' : 'ETH';
  }

  const getBalanceLabel = ({isInput}) => {
    let targetBalance;
    if (isInput) {
      targetBalance = isPurchaseAction ? balance.eth : balance.tokens;
      return window.web3.utils.fromWei(targetBalance, 'Ether');
    }

    targetBalance = isPurchaseAction ? balance.tokens : balance.eth;
    return window.web3.utils.fromWei(targetBalance, 'Ether');
  }

  const getActionButtonText = () =>
    isPurchaseAction ? 'Sell' : 'Purchase';

  return (
    <>
      <form
        className="Swapper-form"
        onSubmit={e => {
          e.preventDefault();
          onSubmitHandler(exchangeValue.toString(), isPurchaseAction);
        }}
      >
        <div className="Swapper-form-input-container">
          <div className="Swapper-form-input-label-container">
            <span>Input <b>{getValuesLabel({isInput: true})}</b></span>
            <span>{getBalanceLabel({isInput: true})}</span>
          </div>
          <input
            disabled={purchaseLoading}
            type="number"
            value={exchangeValue}
            onChange={onChangeExchangeValueHandler}
          />
        </div>
        <div className="Swapper-form-input-container">
          <div className="Swapper-form-input-label-container">
            <span>Output <b>{getValuesLabel({isInput: false})}</b></span>
            <span>{getBalanceLabel({isInput: false})}</span>
          </div>
          <input
            disabled
            type="number"
            value={convertedValue}
          />
        </div>
        <span>Exchange rate: 1 ETH = {balance.exchangeRate} DApp Tokens</span>
        <button
          disabled={purchaseLoading}
          className="Swapper-button"
          type="submit"
        >{purchaseLoading ? 'loading...' : 'swap'}</button>
      </form>
      <button type="button" onClick={onChangeIsPurchaseAction}>{getActionButtonText()}</button>
    </>
  );
}
