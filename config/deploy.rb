require "bundler/capistrano"
require "rvm/capistrano"
require "erb"

default_run_options[:pty] = true

role :web, "50.16.48.4"
role :app, "50.16.48.4"
role :db, "50.16.48.4", :primary => true

set(:rvm_type)          { :system }
set(:rvm_ruby_string)   { "1.9.3-p374" }
set(:ruby_version)      { '1.9.3-p374' }
set(:rvm_path)          { "/usr/local/rvm" }
set :ruby_path, "/usr/local/bin/ruby"

set :user, 'ec2-user'
set :use_sudo, false
set :rake, 'bundle exec rake'
set :deploy_to, "/srv/rails/comments"
set :rails_env, "production"

set :scm, 'git'
set :branch, 'master'
set :repository, "https://github.com/railskumar/comments.git"
set :git_enable_submodules, 1
set :git_shallow_clone, 1
set :scm_verbose, true

set :deploy_via, :remote_cache
set :repository_cache, "cached_copy"

ssh_options[:port] = 22
ssh_options[:username] = 'ec2-user'
ssh_options[:host_key] = 'ssh-dss'
ssh_options[:paranoid] = false
ssh_options[:forward_agent] = true
ssh_options[:keys] = %w(~/ssh-keys/similar/Similar-Beliefs.pem)

after "deploy:setup", "deploy:create_shared_directories"

after "deploy:create_symlink", "deploy:link_shared_directories"

after "deploy:p_assets", "deploy:restart"
after "deploy:cp_assets", "deploy:restart"

after "deploy", "deploy:cleanup"

namespace :deploy do
  task :start do ; end
  task :stop do ; end

  task :restart, :roles => :app, :except => { :no_release => true } do
    run "sudo touch #{File.join(current_path, 'tmp', 'restart.txt')}"
  end

  task :cp_assets, :roles => :app do
    run "rm -rfv #{current_path}/public/assets/*; cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake assets:precompile"
  end

  task :p_assets, :roles => :app do
    run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake assets:precompile"
  end

  task :create_shared_directories, :role => :app do
    run "mkdir -p #{shared_path}/sockets"
    run "mkdir -p #{shared_path}/uploads"
    run "mkdir -p #{shared_path}/pids"
    run "mkdir -p #{shared_path}/log"
    run "mkdir -p #{shared_path}/bundle"
    run "mkdir -p #{shared_path}/assets"
  end

  task :link_shared_directories, :roles => :app do
    run "rm -rf #{current_path}/tmp/sockets; ln -s #{shared_path}/sockets #{current_path}/tmp/sockets"
    run "rm -rf #{current_path}/public/uploads; ln -s #{shared_path}/uploads #{current_path}/public/uploads"
    run "rm -rf #{current_path}/public/assets; ln -s #{shared_path}/assets #{current_path}/public/assets"
  end

  task :db_create, :roles => :app do
    run "cd #{current_path};RAILS_ENV=#{rails_env} bundle exec rake db:create"
  end

  task :db_migrate, :roles => :app do
    run "cd #{current_path};RAILS_ENV=#{rails_env} bundle exec rake db:migrate"
  end

  task :db_seed, :roles => :app do
    run "cd #{current_path};RAILS_ENV=#{rails_env} bundle exec rake db:seed"
  end
end

