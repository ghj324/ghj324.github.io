class SurveyAPI {
    static async submitSurvey(answers) {
        try {
            const response = await fetch('https://ghj324.github.io/api/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers)
            });
            return await response.json();
        } catch (error) {
            console.error('提交调查问卷失败:', error);
            throw error;
        }
    }

    static async getResults(surveyId) {
        try {
            const response = await fetch(`https://ghj324.github.io/api/results/${surveyId}`);
            return await response.json();
        } catch (error) {
            console.error('获取分析结果失败:', error);
            throw error;
        }
    }
}
