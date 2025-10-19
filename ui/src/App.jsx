import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Sidebar />
    </QueryClientProvider>
  )
}

export default App
