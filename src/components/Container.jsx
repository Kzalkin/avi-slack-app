import { Outlet } from 'react-router-dom'

function Container() {
  return (
    <div className="App">
        <Outlet/>
    </div>
  )
}

export default Container