import React from 'react'

function CustomButton({icon, btnText, className, link, layout, clickEvent, target}) {
  return (
    <button className={className} onClick={() => clickEvent}>
        <a href={link} className={layout} target={target}>
            {icon}{btnText}
        </a>
    </button>
  )
}

export default CustomButton