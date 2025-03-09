class AnalysisService {
  static async getAnalysis() {
    try {
      const response = await fetch('/api/analysis');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('获取分析结果失败:', error);
      throw error;
    }
  }

  static displayResults(data) {
    const resultsDiv = document.getElementById('analysis-results');
    if (!resultsDiv) return;

    const html = `
      <h3>体质分析结果</h3>
      <p>您的主要体质类型：${data.constitution_type}</p>
      <h4>推荐养生茶饮：</h4>
      <ul>
        ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    `;

    resultsDiv.innerHTML = html;
  }
}
