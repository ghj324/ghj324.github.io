require 'json'
require 'net/http'

class SurveyService
  SURVEY_ID = '18719659'
  
  def initialize
    @last_check_time = Time.now
  end

  def fetch_responses
    # 使用问卷的公开数据接口
    url = "https://wj.qq.com/api/survey/#{SURVEY_ID}/responses"
    
    begin
      response = Net::HTTP.get_response(URI(url))
      if response.is_a?(Net::HTTPSuccess)
        JSON.parse(response.body)
      else
        { error: '获取数据失败' }
      end
    rescue => e
      { error: e.message }
    end
  end

  # ... 其他代码保持不变 ...
end
  CONSTITUTION_KEYWORDS = {
    '阳虚质' => ['怕冷', '手脚冰凉', '精神疲惫'],
    '阴虚质' => ['失眠', '头疼', '衰老'],
    '气虚质' => ['气血不足', '贫血', '疲劳'],
    '痰湿质' => ['肥胖', '湿气重', '消化不良'],
    '气郁质' => ['抑郁', '情绪低落', '胸闷'],
    '血瘀质' => ['痛经', '淤血', '瘀斑'],
    '特禀质' => ['过敏', '敏感', '体质差'],
    '平和质' => ['精力充沛', '胃口好', '睡眠好'],
    '湿热质' => ['便秘', '口干', '上火']
  }

  RECOMMENDATIONS = {
    '阳虚质' => ['生姜红糖茶', '桂圆红枣茶'],
    '阴虚质' => ['菊花枸杞茶', '石斛养生茶'],
    '气虚质' => ['人参养生茶', '黄芪当归茶'],
    '痰湿质' => ['荷叶山楂茶', '陈皮普洱茶'],
    '气郁质' => ['玫瑰花茶', '柑橘茯苓茶'],
    '血瘀质' => ['红花茶', '当归茶'],
    '特禀质' => ['薄荷茶', '金银花茶'],
    '平和质' => ['绿茶', '乌龙茶'],
    '湿热质' => ['菊花茶', '金银花茶']
  }

  def initialize(api_key)
    @api_key = api_key
  end

  def fetch_survey_data
    # 这里需要替换为实际的腾讯问卷 API 接口
    response = HTTParty.get(
      "https://wj.qq.com/api/surveys/#{survey_id}/responses",
      headers: { 'Authorization' => "Bearer #{@api_key}" }
    )
    JSON.parse(response.body)
  end

  def analyze_response(answers)
    constitution_scores = Hash.new(0)
    
    CONSTITUTION_KEYWORDS.each do |constitution, keywords|
      keywords.each do |keyword|
        answers.values.each do |answer|
          if answer.to_s.include?(keyword)
            constitution_scores[constitution] += 1
          end
        end
      end
    end

    main_constitution = constitution_scores.max_by { |_, score| score }&.first
    recommendations = RECOMMENDATIONS[main_constitution] || []

    {
      constitution_type: main_constitution,
      recommendations: recommendations,
      analysis: constitution_scores
    }
  end
end
