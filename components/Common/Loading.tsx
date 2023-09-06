import React from 'react'

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = ({ }) => {
  return (
    <div className="mt-20 mb-20 h-100 w-full flex items-center justify-center">
      <div
        className="
            inline-block 
            h-8 
            w-8 
            animate-spin 
            items-center
            justify-center
            text-center
            rounded-full 
            border-4 
            border-solid 
            border-current 
            border-r-transparent 
            align-[-0.125em] 
            motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span 
          className="
            !absolute 
            !-m-px 
            !h-px 
            !w-px 
            !overflow-hidden 
            !whitespace-nowrap 
            !border-0 
            !p-0 
            ![clip:rect(0,0,0,0)]"
          >
          Loading...
        </span>
    </div>
    </div>
    
  )
}

export default Loading