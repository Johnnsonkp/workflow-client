import defaultLogo from '/public/workflows-logo.png'

function AppLogoContainer({width, height}) {
  return (
    // <a href="/" className={`w-[400px] h-[50px]`}>
    <a href="/" className={``}>
        <img 
          src={defaultLogo} 
          className={`w-[${width? width : "140px"}] h-[${height? height : "60px"}]`} />

        {/* <img src={defaultLogo} className='w-[140px] h-[60px]' /> */}
    </a>
  )
}

export default AppLogoContainer