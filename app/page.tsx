import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Account } from './components/Account'

export default async function Page() {
  return (
    <main>
      <Account />
    </main>
  )
}
