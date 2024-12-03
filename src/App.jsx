import { Outlet } from 'react-router-dom'
import Navbar from './Compo/Navbar'

function App() {

  return (
    <>

<Navbar></Navbar>

<div className='max-w-6xl mx-auto py-10'>
<Outlet></Outlet>
</div>

    </>
  )
}

export default App
