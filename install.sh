#!/bin/bash
# For Ubuntu: apt-get install libavahi-compat-libdnssd-dev
function fetch(){
	echo "Fetching project from Github"
	git clone https://github.com/balkian/Web4.0.git Web4.0
	cd Web4.0
}
function install_npm(){
	echo "Installing NPM"
	curl http://npmjs.org/install.sh | sudo sh
}
function install_node(){
	echo "Instaling nodejs"
	sudo apt-get install nodejs-dev
	#sudo sudo npm install hook.io
	#sudo npm install hookio/hooks/*
}
function install_package(){
	echo "Installing npm package"
	sudo npm install $1
}

while getopts ":agupi" opt;do
	case $opt in
		a)
			fetch;
			install_node;
			install_npm;
			install_package .;
		;;
		g)
			fetch;
		;;
		u)
			install_npm;
		;;
		p)
			install_package;
		;;
		i)
			install_npm;
			install_node;
		;;
		\?)
			echo "Probably you want to run $0 -a"

		;;
	esac
done
