import { LayoutProps } from '@/lib/types/layout'
import { QueryProvider } from './react-query'
import ProgressBarProvider from './progress-bar'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: LayoutProps) {
  return (
    <QueryProvider>
      <ProgressBarProvider>
        {children}
        <Toaster richColors position="bottom-right" />
      </ProgressBarProvider>
    </QueryProvider>
  )
}
