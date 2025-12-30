import { BrowserRouter } from "react-router-dom"
import {AppRouter} from "./router/AppRouter"
import '@/index.css'

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
