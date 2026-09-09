
import './style.css';
import Sidebar from '@/components/Sidebar';
export default async function RootLayout({children}) {
  return (
    <html>
      <head>
        <title>
          YiAN的大模型工程师博客
        </title>
        <meta name='description' content='YiAN的大模型工程师博客'></meta>
        <meta name='keywords' content='llm,claude'></meta>
      </head>
      <body>
       <div className='container'>
          <div className='main'>
            <Sidebar/>
            <section className='col note-viewer'>{children}</section>
          </div>
       </div>
     
      </body>
    </html>
  )
}