import Identicon from 'identicon.js';
import './styles.css';

export const Header = ({address}) => (
  <header className="Header">
    <h2>ETH SWAP</h2>
    {address && (
      <div className="Header-address">
        <span>{address}</span>
        <img width="30" height="30" src={`data:image/png;base64,${new Identicon(address, 30).toString()}`} />
      </div>
    )}

  </header>
);
