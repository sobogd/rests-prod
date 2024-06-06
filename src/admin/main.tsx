import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { Page } from './components/Page';
import i18n from './i18n';
import { AlertProvider } from './providers/Alert';
import { AuthProvider } from './providers/Auth';
import { ThemeProvider } from './providers/Theme';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AlertProvider>
          <AuthProvider>
            <Page />
          </AuthProvider>
        </AlertProvider>
      </ThemeProvider>
    </I18nextProvider>
  </Provider>,
);
