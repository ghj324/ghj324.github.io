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
        },
        bloodDeficiency: {
            constitution: '气血两虚',
            prescriptions: ['八珍汤', '当归补血汤'],
            teas: ['红枣枸杞茶', '当归生姜茶'],
            advice: '注意营养均衡，适度运动，保证充足睡眠'
        },
        obesity: {
            constitution: '痰湿质',
            prescriptions: ['防己黄芪汤', '茯苓薏仁汤'],
            teas: ['荷叶山楂茶', '决明子茶'],
            advice: '清淡饮食，适量运动，忌食生冷油腻'
        }
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
