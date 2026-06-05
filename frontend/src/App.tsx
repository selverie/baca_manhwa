import { BrowserRouter } from 'react-router';
import { SWRConfig } from 'swr';
import { ConfigProvider, theme } from 'antd';
import { AuthProvider } from './hooks/useAuth';
import { Routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#e63946',
            colorBgBase: '#0a0a0a',
            colorBgContainer: '#1a1a1a',
            colorBorder: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            fontFamily: "'Sora', -apple-system, sans-serif",
          },
        }}
      >
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SWRConfig>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
