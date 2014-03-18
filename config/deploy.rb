#$:.unshift(File.expand_path('./lib', ENV['rvm_path'])) # Add RVM's lib directory to the load path.
require "rvm/capistrano"    
require 'bundler/capistrano'
require "erb"

set(:rvm_type)          { :system }
set(:rvm_ruby_string)   { "1.9.3-p374" }
set(:ruby_version)      { '1.9.3-p374' }
set(:rvm_path)          { "/usr/local/rvm" }
set :ruby_path, "/usr/local/bin/ruby"

set :scm, :git
set :repository, "https://github.com/railskumar/comments.git"
set :application, "comments"
set :branch, "master"
set :deploy_to, '/srv/rails/comments'
set :rails_env, 'production'
set :use_sudo, false

set :user, 'ec2-user'

#set :git_enable_submodules, 1
#set :git_shallow_clone, 1
#set :scm_verbose, true

#set :deploy_via, :remote_cache
#set :repository_cache, "cached_copy"
set :deploy_via, :copy

ssh_options[:port] = 22
ssh_options[:username] = 'ec2-user'
ssh_options[:host_key] = 'ssh-dss'
ssh_options[:paranoid] = false
ssh_options[:forward_agent] = true
ssh_options[:keys] = %w(~/ssh-keys/similar/Similar-Beliefs.pem)

default_run_options[:pty] = true

role :web, "54.83.7.118"
role :app, "54.83.7.118"
role :db, "54.83.7.118", :primary => true


# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:

namespace :deploy do
  desc "symlink all files in the shared directory"
  task :shared_symlink do
    #run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
  end
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :comments do
  task :symlink do
    run "ln -nfs #{shared_path}/system/uploads #{release_path}/public/uploads"
    run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
  end
end

before "deploy:assets:precompile", "deploy:shared_symlink"
after "deploy:symlink", "comments:symlink"
