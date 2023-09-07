import React from 'react'
import { CustomButton, TextString } from '@/components/Common'
import ResultInterFace from "@/interface/Result"
import { twMerge } from 'tailwind-merge'

interface SuccessProps {
  data: ResultInterFace,
  onClick: () => void
}

const Success: React.FC<SuccessProps> = ({ 
  data, 
  onClick
}) => {
  
  const passText: string = 'You are in a great shape. Keep doing this';
  const failText: string = 'You need to study more!'

  return (
    <div className="bg-white flex justify-center items-center w-screen h-200 mt-40 p-5">
        <div className="border shadow-teal-300 shadow-md max-w-2xl p-6 rounded-lg">
            <div className="border-b-2 mb-8 text-center">
                <h1 className="text-4xl font-mono font-extrabold py-3">{data.status}</h1>
            </div>
            {
                data?.corrAns.length > 0 ? 
                <ul className="list-disc text-lg px-6">
                    {
                        data?.corrAns.map((ans: string, idx: number) => (
                            <li key={idx}>
                                {`Your Answer : ${data.wrongAnswers[idx]}  - Correct Answer : ${ans}`}
                            </li>
                        ))
                    }
                </ul>
                :
                <TextString id='passed-label' label='You have chosen all of the correct answers!' />
            }
            <div className='border-t-2 mt-5 pt-5 flex flex-row justify-between'>
                <h6 className={twMerge("text-sm font-mono font-extrabold", data.result >= 50 ? 'text-green-700' : 'text-red-700')}>
                    {data.result >= 50 ? passText : failText}
                </h6>
                <CustomButton
                    color='gold' 
                    size='1' 
                    onClick={onClick} 
                    label="Retake Quiz"/>
            </div>
        </div>
    </div>
  )
}

export default Success