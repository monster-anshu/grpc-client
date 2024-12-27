#!/bin/bash

branch_name=$(git rev-parse --abbrev-ref HEAD)
git submodule foreach "(git fetch; git switch $branch_name)"
