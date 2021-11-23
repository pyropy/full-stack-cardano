import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NamiWalletContextProvider } from '../shared/context/nami-wallet'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NamiWalletContextProvider>
      <Component {...pageProps} />
    </NamiWalletContextProvider>
  )
}

export default MyApp
