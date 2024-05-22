import defaultLogo from '/public/workflows-logo.png'

function AppLogoContainer() {
  return (
    <a href="/" className='w-[200px] h-[50px]'>
        <img src={defaultLogo} className='w-[140px] h-[60px]' />
    </a>
  )
}

export default AppLogoContainer