class SurveyAPI {
    static async submitSurvey(answers) {
        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers)
            });
            return await response.json();
        } catch (error) {
            console.error('提交问卷失败:', error);
            throw error;
        }
    }

    static async getResults(surveyId) {
        try {
            const response = await fetch(`/api/results/${surveyId}`);
            return await response.json();
        } catch (error) {
            console.error('获取结果失败:', error);
            throw error;
        }
    }
}
