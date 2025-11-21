import React from 'react'

export default function Title({title1, title2, titleStyles, title2Styles, paraStyles, para}) {
  return (
    <div className={`mb-8 max-w-[570px] text-center lg:text-left ${titleStyles}`}>
      <h4 className='h4 text-solid'>{title1}</h4>
      <div className='flex  flex-col xl:flex-row xl:justify-between '>
        <h2 className={`${title2Styles} capitalize`}>{title2}</h2>
   <p className={`${paraStyles} max-w-lg xl:place-self-end xl:relative xl:bottom-3`}>{para ? para : 'Find reliable car with transparent pricing, verified inspections , flexible pickub and delivery options, and 24/7 customer support for a smooth rental or buying experience.'}</p>
      </div>
    </div>
  )
}
