import ResultInterFace from "@/interface/Result"

export const fetchQuestions = async (url : string) => {
    try {
        const response = await fetch(url)
        const jsonData = await response.json()
        return jsonData
    } catch (e) {
        console.log(e,'e')
    }
}

export const SubmitQuestions = async (correctAnswers: string[], quizAns: string[]): Promise<ResultInterFace> => {
    await new Promise((resolve) => setTimeout(resolve,2000));
    
    let percentage: number = 0;
    let wrongAnswers: string[] = [];
    let corrAns: string[] = [];
    quizAns.forEach((ans,idx) => {
        if(ans === correctAnswers[idx]) {
            percentage += 10
        } else {
            wrongAnswers.push(ans)
            corrAns.push(correctAnswers[idx])
        }
    });

    return {
        result: percentage,
        status: percentage > 50 ? "Passed!" : "Failed!",
        wrongAnswers,
        corrAns
    }
}