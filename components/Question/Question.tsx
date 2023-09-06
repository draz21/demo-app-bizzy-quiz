'use client';

import React, { useEffect, useState } from 'react'

import { TextString } from '@/components/Common';
import QuestionItems from './QuestionItems';

interface QuestionProps {
  id: string,
  title: string,
  answers: Array<string>,
  questionIndex: number,
  onSelect: (ans: string) => void,
  selectedIndex: number | null,
  setSelectedIndex : (index: number) => void,
  preSelectedAnswer?: string
}

const Question: React.FC<QuestionProps> = ({
  id,
  title,
  answers,
  questionIndex,
  onSelect,
  selectedIndex,
  setSelectedIndex,
  preSelectedAnswer
}) => {

  const [preSelect, setPreSelect] = useState<string>('')

  useEffect(() => {
    if(preSelectedAnswer) {
      setPreSelect(preSelectedAnswer)
    }
  },[preSelectedAnswer])

  const handleOnSelect = (ans: string, index: number) =>{
    onSelect(ans)
    setSelectedIndex(index)
    setPreSelect('')
  }

  return (
    <React.Fragment>
        <div className="pb-4 border-b-2 border-gray-300 text-center">
            <TextString id={`${id}-title`} label={`${questionIndex + 1} : ${title}`} />
        </div>
        <div className="pt-4 items-center">
            {
                answers.map((answer: string, index: number) => {
                    return (
                      <QuestionItems 
                        key={index}
                        id={id}
                        answer={answer}
                        index={index}
                        onSelect={handleOnSelect}
                        isSelected={selectedIndex === index || preSelect === answer}
                      />
                    )
                })
            }
        </div>
    </React.Fragment>
  )
}

export default Question