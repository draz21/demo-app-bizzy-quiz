interface QuestionsProps {
    category: string,
    correct_answer: string,
    difficult: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

interface ApiResponse {
    response: number,
    results : QuestionsProps[]
}


export default ApiResponse