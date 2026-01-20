//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { MainLayout } from './components'
import { Overview } from './features'

function App() {

  return (
    <>
    <MainLayout>

            <h1>My portfolio</h1>
<Overview/>
    </MainLayout>

        
    </>
  )
}

export default App
