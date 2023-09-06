interface ResultInterFace {
    result: number,
    status: string,
}

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
    await new Promise((resolve) => setTimeout(resolve,1000));

    let percentage = 0;
    quizAns.forEach((ans,idx) => {
        if(ans === correctAnswers[idx]) {
            percentage += 10
        }
    });

    return {
        result: percentage,
        status: percentage > 50 ? "Pass" : "Fail"
    }
}