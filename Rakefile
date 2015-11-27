require 'html/proofer'

task :test do
  sh "bundle exec jekyll build"
  HTML::Proofer.new("./_site", {:href_ignore => ["#"], :href_swap => {%r{https://blog.automategreen.com(/.*)} => "\\1"}}).run
end