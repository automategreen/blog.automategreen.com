require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    :allow_hash_href => true,
    :href_swap => {%r{https://blog.automategreen.com(/.*)} => "\\1"}
  }).run
end
