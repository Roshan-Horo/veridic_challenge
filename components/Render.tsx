import type { AppProps } from 'next/app'


function Render({ children}: {children: React.ReactNode}) {

  return (
      <p>{children}</p>
  )
}

export default Render
