#!/bin/bash
#
# install.sh
#
# HOW TO USE:
# 1. Run
#	bash install.sh
#
# NOTES:
# This script will installs dependencies with NPM and Bower and
# clean redundant files.
#

echo -e "\n------------------------------------------------"
echo -e "Installation in progress. Please wait..."

# ---------------------------------------------------------------------------
# Vars
# ---------------------------------------------------------------------------
#
# Set the start time
start_seconds="$(date +%s)"

# ------------------------------------------------------------------------
# Remove initial `.git` directory
# ------------------------------------------------------------------------
#
echo -e "Removing initial .git directory..."
rm -rf .git/         && \
# ------------------------------------------------------------------------
# Remove the `.sass-cache` directory
# ------------------------------------------------------------------------
#
rm -rf .sass-cache/  && \
# ------------------------------------------------------------------------
# Remove .gitkeep files
# ------------------------------------------------------------------------
#
echo -e "Removing any .gitkeep files..."
find . -name ".gitkeep" -print0 | xargs -0 rm -rf  && \
# ------------------------------------------------------------------------
# Initialize a new Git instance
# ------------------------------------------------------------------------
#
echo -e "Initialize new Git instance..."
git init             && \
# ------------------------------------------------------------------------
# Remove the clean file
# ------------------------------------------------------------------------
#
rm install.sh        && \

echo -e "$(tput setaf 2)Some questions for you:$(tput sgr0)"
# ------------------------------------------------------------------------
# README
# ------------------------------------------------------------------------
#
if [[ -e ./README.md ]]; then
	read -p "Do you need the Readme file? y/n " choice
	if [[ $choice = "n" ]]; then
		echo -e "$(tput setaf 3)Removing README.md...$(tput sgr0)"
		rm ./README.md
	fi
	printf "\n"
fi
# ------------------------------------------------------------------------
# htaccess
# ------------------------------------------------------------------------
#
if [[ -e ./src/.htaccess ]]; then
	read -p "Do you need the htaccess file? y/n " choice
	if [[ $choice = "n" ]]; then
		echo -e "$(tput setaf 3)Removing .htaccess...$(tput sgr0)"
		rm ./src/.htaccess
	fi
	printf "\n"
fi
# ------------------------------------------------------------------------
# Check for a commit
# ------------------------------------------------------------------------
#
read -p "Do you want to do an initial commit? y/n " choice
if [[ $choice = "y" ]]; then
	echo -e "$(tput setaf 3)Will do initial commit after install$(tput sgr0)"
	INITIAL_COMMIT=true
fi
printf "\n"
# ------------------------------------------------------------------------
# Update / get dependencies with Bower
# ------------------------------------------------------------------------
#
echo -e "Getting bower dependencies..."
bower install                                        && \
# ------------------------------------------------------------------------
# Update / get dependencies with NPM
# ------------------------------------------------------------------------
#
echo -e "Getting NPM dependencies..."
npm install                                          && \
# ------------------------------------------------------------------------
# Move bower dependency
# ------------------------------------------------------------------------
#
echo -e "Moving /dist/ directory to it's new home..."
cp -r bower_components/framework-library/dist ./src  && \
# ------------------------------------------------------------------------
# Git commit
# ------------------------------------------------------------------------
#
if [ "$INITIAL_COMMIT" = true ] ; then
	echo -e "Adding files to Git..."
	git add --all
	echo -e "Committing files to Git..."
	git commit -am "Initial commit"
fi
printf "\n"
# ------------------------------------------------------------------------
# Create a dev branch
# ------------------------------------------------------------------------
#
echo -e "Creating a dev branch..."
git branch dev
# ---------------------------------------------------------------------------
# Complete
# ---------------------------------------------------------------------------
#
end_seconds="$(date +%s)"
echo -e "$(tput setaf 2)Framework installed successfully in "$(expr $end_seconds - $start_seconds)" seconds$(tput sgr0)"
echo -e "------------------------------------------------\n"
# ------------------------------------------------------------------------
# Run a Git status
# ------------------------------------------------------------------------
#
git status