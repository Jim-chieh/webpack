import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { CartItemsProvider } from './CartItemsContext';

import banana from './banana';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
	banana();
	return (
		<CartItemsProvider>
			<Reset />
			<GlobalStyle />
			<Header />
			<Outlet />
			<Footer />
		</CartItemsProvider>
	);
}

export default App;
