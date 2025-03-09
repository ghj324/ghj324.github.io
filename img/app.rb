require 'sinatra'
require 'json'
require 'sqlite3'

class SurveyApp < Sinatra::Base
  before do
    headers 'Access-Control-Allow-Origin' => 'https://ghj324.github.io'
    headers 'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS'
    headers 'Access-Control-Allow-Headers' => 'Content-Type'
  end

  def init_db
    @db = SQLite3::Database.new 'survey.db'
    @db.execute <<-SQL
      CREATE TABLE IF NOT EXISTS surveys (
        id INTEGER PRIMARY KEY,
        answers TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    SQL
  end

  post '/api/survey' do
    content_type :json
    data = JSON.parse(request.body.read)
    
    init_db
    @db.execute("INSERT INTO surveys (answers) VALUES (?)", [data.to_json])
    
    analysis = analyze_answers(data)
    analysis.to_json
  end

  get '/api/results/:id' do
    content_type :json
    init_db
    
    result = @db.get_first_row("SELECT * FROM surveys WHERE id = ?", [params[:id]])
    halt 404, {error: 'Not found'}.to_json unless result
    
    answers = JSON.parse(result[1])
    analysis = analyze_answers(answers)
    analysis.to_json
  end

  private

  def analyze_answers(answers)
    symptoms_map = {
      '阳虚' => ['怕冷', '手脚冰凉', '精神疲惫'],
      '阴虚' => ['失眠', '头疼', '衰老'],
      '气虚' => ['气血不足', '贫血', '疲劳'],
      '痰湿' => ['肥胖', '湿气重', '消化不良'],
      '气郁' => ['抑郁', '情绪低落', '胸闷']
    }

    results = {}
    symptoms_map.each do |constitution, keywords|
      score = keywords.count { |keyword| answers.values.any? { |answer| answer.include?(keyword) } }
      results[constitution] = score if score > 0
    end

    recommendations = generate_recommendations(results.max_by { |_, v| v }&.first)

    {
      constitution_type: results.max_by { |_, v| v }&.first,
      analysis: results,
      recommendations: recommendations
    }
  end

  def generate_recommendations(constitution_type)
    recommendations = {
      '阳虚' => ['生姜红糖茶', '桂圆红枣茶'],
      '阴虚' => ['菊花枸杞茶', '石斛养生茶'],
      '气虚' => ['人参养生茶', '黄芪当归茶'],
      '痰湿' => ['荷叶山楂茶', '陈皮普洱茶'],
      '气郁' => ['玫瑰花茶', '柑橘茯苓茶']
    }

    recommendations[constitution_type] || []
  end
end
