import defaultLogo from '/public/workflows-logo.png'

function AppLogoContainer({width, height, className}) {
  return (
    <div className={className}>
      <a href="/" className={``}>
          <img 
            src={defaultLogo} 
            className={`w-[${width? width : "140px"}] h-[${height? height : "60px"}]`} 
          />
      </a>
    </div>
  )
}

export default AppLogoContainer