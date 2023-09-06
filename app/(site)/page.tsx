'use client';

import { useState } from 'react';
import { fetchQuestions, SubmitQuestions } from '@/api';
import { useMutation, useQuery } from 'react-query';

import { CustomButton, Loading } from '@/components/Common';
import Question from '@/components/Question/Question';

const Page = () => {

  const [questionIndex, setQuestinIndex] = useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [singleAnswer, setSingleAnswer] = useState<string>('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
 
  const { data , isLoading } = useQuery({
    queryFn: async () => await fetchQuestions('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'),
    staleTime: Infinity,
    cacheTime: 0,
  })

  const correctAnswer = data?.results?.[questionIndex].correct_answer
  const allAnswers = data?.results?.[questionIndex].incorrect_answers
  const totalQuestion = data?.results?.length
  const isLastQuestion = questionIndex === totalQuestion - 1

  const goNext = () => {
    //set the user answer
    quizAnswers[questionIndex] = singleAnswer
    setQuizAnswers(quizAnswers)
    // set the correct answer
    correctAnswers[questionIndex] = correctAnswer
    setCorrectAnswers(correctAnswers)
    if(questionIndex < totalQuestion - 1) {
      setQuestinIndex(value => value + 1)
      //set the default to answer selection
      setSelectedAnswerIndex(null)
      //save the answer to total answers
   
    } else if(isLastQuestion) {

      //submit the final test
      SubmitAnswer()
    }
  }

  const goPrevious = () => {
    if(questionIndex > 0) {
      setQuestinIndex(value => value - 1)
      //remove last element from array
      const newArr = quizAnswers.slice(0,questionIndex)
      setQuizAnswers(newArr)
      setSelectedAnswerIndex(null)
      correctAnswers.pop()
      setCorrectAnswers(correctAnswers)
    }
  }
  const buttonLabel = isLastQuestion ? "Submit" : "Next"

  // index = question index
  const handleSelect = (answer: string) => {
    setSingleAnswer(answer)
  }

  const { mutateAsync: SubmitAnswer, isLoading : submitLoading } = useMutation({
    mutationFn: async () => await SubmitQuestions(correctAnswers,quizAnswers),
    onSuccess: (data) => {
      console.log(data,'data')
    }
  })

  return (
    <div className="mt-40 h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-slate-100 rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        {
          isLoading || submitLoading ? 
          <Loading /> :
          <Question 
            id={`bizzy-quiz-${questionIndex}`}
            title={data?.results?.[questionIndex].question}
            answers={[...allAnswers, correctAnswer]}
            questionIndex={questionIndex}
            onSelect={handleSelect}
            selectedIndex={selectedAnswerIndex}
            setSelectedIndex={setSelectedAnswerIndex}
            preSelectedAnswer={quizAnswers[questionIndex]}
          />
        }
        {
          !isLoading && !submitLoading && (
            <div className='mt-4 justify-center flex flex-row gap-2'>
              <CustomButton 
                disabled={questionIndex === 0}
                color='indigo' 
                size='1' 
                onClick={goPrevious} 
                label="Previous"/>
              <CustomButton 
                disabled={selectedAnswerIndex === null}
                color='grass' 
                size='1' 
                onClick={goNext} 
                label={buttonLabel}/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Page