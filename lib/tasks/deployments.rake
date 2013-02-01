namespace :dep do

  desc "Push to origin master or given branch after running specs"
  task :push => [:spec] do
    push_branch = ENV["BRANCH"] || "master"
    puts "Pushing to #{push_branch}"
    sh "git pull origin #{push_branch}"
    sh "git push origin #{push_branch}"
  end

  desc "Push to production after running specs and push to origin"
  task :production => [:push] do
    puts "Pushing to production"
    sh "git push heroku"
    sh "heroku run rake db:migrate --app rdfnet-comments"
  end

  task :diff_feature do
    branch = ENV["B"]
    sh "git checkout #{branch}"
    sh "git pull origin #{branch}"
    sh "git checkout master"
    sh "git merge #{branch} --no-commit --no-ff"
  end

end