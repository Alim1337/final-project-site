import UserForm from '../components/UserForm'
import Header from '@/components/Header'
import BgLogin from '@/components/bg_login'
export default function Form() {

  async function handleFormSubmit(name, email) {
    const response = await fetch('/api/form_api_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
  
    const data = await response.json()
    console.log('Result:', data)
  }

  return (
    <div>

<div className="flex flex-col min-h-screen">
  <Header />
  <BgLogin />
      <h3>User Form</h3>
      <UserForm onSubmit={handleFormSubmit} />
    </div>
    </div>

  )
}