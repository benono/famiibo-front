import { NavBar } from './components/NavBar'
import { Account } from './components/Account'

export default async function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Account />
      </main>
    </>
  )
}
