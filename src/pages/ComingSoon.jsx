import { Feature } from "../components/featuresDisplay/ReactRailsFeacture"
import InnerTopNav from "../components/innerTopNav/InnerTopNav"
import reactLogo from '../../public/reactLogo.svg'

function ComingSoon() {
  let current_path = window.location.pathname.replace('/', '')

  return (
    <div className='h-[90vh] w-[100%] bg-inherit'>
        <InnerTopNav title={current_path} disableControl={true}/>
        <div className="flex justify-center align-middle">
            <h1 className="text-center text-xl align-middle">
                {current_path? current_path : 'This'} page is under construction...
            </h1> 
            <Feature imgSrc={reactLogo} title={'React'}/>
        </div>
    </div>
  )
}

export default ComingSoon