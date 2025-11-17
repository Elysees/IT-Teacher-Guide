require 'json'

module Jekyll
  class SearchGenerator < Generator
    safe true
    priority :low

    def generate(site)
      search_data = []
      
      # 处理所有页面和文档
      all_docs = site.documents + site.pages
      
      all_docs.each do |doc|
        # 跳过非内容页面
        next if doc.data['sitemap'] == false
        next if doc.url.start_with?('/assets/')
        next if doc.url.include?('404')
        
        # 获取页面内容
        content = doc.content || ''
        
        # 移除HTML标签和多余空白
        content = content.gsub(/<[^>]*>/, ' ')
                        .gsub(/\s+/, ' ')
                        .strip
        
        # 限制内容长度
        content = content[0, 1000] if content.length > 1000
        
        # 获取摘要
        excerpt = doc.data['description'] || 
                 doc.data['excerpt'] || 
                 content[0, 200]
        
        # 确定分类
        category = determine_category(doc.url)
        
        # 获取标签
        tags = doc.data['tags'] || []
        tags = tags.join(' ') if tags.is_a?(Array)
        
        # 构建搜索条目
        search_item = {
          id: doc.url,
          title: doc.data['title'] || 'Untitled',
          url: doc.url,
          content: content,
          excerpt: excerpt,
          category: category,
          section: determine_section(category),
          tags: tags,
          date: doc.date ? doc.date.strftime('%Y-%m-%d') : ''
        }
        
        search_data << search_item
      end
      
      # 生成搜索数据文件
      File.open(File.join(site.dest, 'search.json'), 'w') do |file|
        file.write(JSON.pretty_generate(search_data))
      end
      
      # 生成lunr索引配置
      lunr_config = {
        fields: {
          title: { boost: 10 },
          content: { boost: 1 },
          excerpt: { boost: 5 },
          tags: { boost: 8 },
          category: { boost: 3 }
        },
        ref: 'id'
      }
      
      File.open(File.join(site.dest, 'lunr-config.json'), 'w') do |file|
        file.write(JSON.pretty_generate(lunr_config))
      end
      
      puts "Generated search index with #{search_data.length} items"
    end
    
    private
    
    def determine_category(url)
      case url
      when /\/python\//
        'python'
      when /\/cpp\//
        'cpp'
      when /\/algorithm\//
        'algorithm'
      when /\/data-structure\//
        'data-structure'
      else
        'general'
      end
    end
    
    def determine_section(category)
      case category
      when 'python'
        'Python教程'
      when 'cpp'
        'C++教程'
      when 'algorithm'
        '算法专题'
      when 'data-structure'
        '数据结构'
      else
        '其他'
      end
    end
  end
end