// 症状与体质对应关系数据
const constitutionData = {
    symptoms: {
        aging: {
            constitution: '肾气虚质',
            prescriptions: ['六味地黄丸', '金匮肾气丸'],
            teas: ['枸杞菊花茶', '何首乌茶'],
            advice: '注意保暖，适度运动，早睡早起，忌生冷'
        },
        insomnia: {
            constitution: '心脾两虚',
            prescriptions: ['归脾汤', '天王补心丹'],
            teas: ['酸枣仁茶', '百合茯苓茶'],
            advice: '保持规律作息，避免过度思虑，适当运动'
        },
        fatigue: {
            constitution: '气虚质',
            prescriptions: ['补中益气丸', '四君子汤'],
            teas: ['人参茶', '西洋参茶'],
            advice: '注意休息，避免过度劳累，适量运动'
        },
        headache: {
            constitution: '肝阳上亢',
            prescriptions: ['天麻钩藤饮', '杞菊地黄丸'],
            teas: ['菊花茶', '决明子茶'],
            advice: '保持心情舒畅，避免情绪激动'
        }
        // ... 其他症状配置
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const healthSurvey = document.getElementById('healthSurvey');
    const resultDiv = document.getElementById('analysisResult');

    // 处理表单提交
    healthSurvey.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(healthSurvey);
        const gender = formData.get('gender');
        const age = formData.get('age');
        const symptoms = formData.getAll('symptoms');
        
        // 分析结果
        const analysis = analyzeSymptoms(symptoms);
        
        // 显示分析结果
        displayResults(analysis);
        
        // 调用 DeepSeek API 获取更详细的建议
        if (symptoms.length > 0) {
            const aiAdvice = await getAIAdvice(symptoms, gender, age);
            if (aiAdvice) {
                displayAIAdvice(aiAdvice);
            }
        }
    });
});

// 症状分析函数
function analyzeSymptoms(symptoms) {
    const analysis = {
        constitutions: new Set(),
        prescriptions: new Set(),
        teas: new Set(),
        advice: new Set()
    };

    symptoms.forEach(symptom => {
        const data = constitutionData.symptoms[symptom];
        if (data) {
            analysis.constitutions.add(data.constitution);
            data.prescriptions.forEach(p => analysis.prescriptions.add(p));
            data.teas.forEach(t => analysis.teas.add(t));
            analysis.advice.add(data.advice);
        }
    });

    return analysis;
}

// 显示分析结果
function displayResults(analysis) {
    const resultDiv = document.getElementById('analysisResult');
    if (!resultDiv) return;

    resultDiv.innerHTML = `
        <h3>体质分析结果</h3>
        <div class="analysis-section">
            <h4>体质类型：</h4>
            <p>${Array.from(analysis.constitutions).join('、')}</p>
            
            <h4>推荐方剂：</h4>
            <p>${Array.from(analysis.prescriptions).join('、')}</p>
            
            <h4>推荐茶饮：</h4>
            <p>${Array.from(analysis.teas).join('、')}</p>
            
            <h4>调理建议：</h4>
            <ul>
                ${Array.from(analysis.advice).map(a => `<li>${a}</li>`).join('')}
            </ul>
        </div>
    `;
}

// 获取 AI 建议
async function getAIAdvice(symptoms, gender, age) {
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                prompt: `基于中医理论，请为一位${age}岁${gender}性患者提供调理建议，
                        主要症状为：${symptoms.join('、')}`,
                max_tokens: 500
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('AI 建议获取失败:', error);
        return null;
    }
}

// 显示 AI 建议
function displayAIAdvice(advice) {
    const aiAdviceDiv = document.getElementById('aiAdvice');
    if (!aiAdviceDiv) return;

    aiAdviceDiv.innerHTML = `
        <h3>AI 个性化建议</h3>
        <div class="ai-advice">
            ${advice.response}
        </div>
    `;
}
// 症状与体质对应关系数据
const constitutionData = {
    symptoms: {
        aging: {
            constitution: '肾气虚质',
            prescriptions: ['六味地黄丸', '金匮肾气丸'],
            teas: ['枸杞菊花茶', '何首乌茶'],
            advice: '注意保暖，适度运动，早睡早起，忌生冷'
        },
        insomnia: {
            constitution: '心脾两虚',
            prescriptions: ['归脾汤', '天王补心丹'],
            teas: ['酸枣仁茶', '百合茯苓茶'],
            advice: '保持规律作息，避免过度思虑，适当运动'
        }
        // ... 其他症状配置
    }
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const healthSurvey = document.getElementById('healthSurvey');
    const resultDiv = document.getElementById('analysisResult');

    if (healthSurvey) {
        healthSurvey.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(healthSurvey);
            const symptoms = formData.getAll('symptoms');
            const analysis = analyzeSymptoms(symptoms);
            displayResults(analysis);
        });
    }
});
