require 'sinatra'
require 'json'
require_relative 'survey_service'

class HealthAPI < Sinatra::Base
  configure do
    set :survey_service, SurveyService.new(ENV['TENCENT_API_KEY'])
  end

  # 获取最新问卷数据并分析
  get '/api/analysis' do
    content_type :json
    
    begin
      survey_data = settings.survey_service.fetch_survey_data
      analysis = settings.survey_service.analyze_response(survey_data)
      analysis.to_json
    rescue => e
      status 500
      { error: e.message }.to_json
    end
  end
end
