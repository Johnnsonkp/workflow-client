import styles from './dashboard.module.css'

function DashboardCards2({children, title, svgIcon}) {
    let data = []
    data.push(title)
    
  return (
    <div className="">
        <div className={`${styles.cardContainer2} relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-[#E6E7EB] max-h-[250px]`}>
            {svgIcon}
            <div className="pr-4 text-right w-[25%] flex !justify-end self-end">
                <p className="font-bold block antialiased font-sans text-sm leading-normal text-blue-gray-600 text-[#fff]">{data[0]}</p>
            </div>
            <div className="p-1">
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardCards2