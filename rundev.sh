#!/bin/bash
cd ./client && yarn dev | 
sed -e 's/^/[client] /' && 
kill $!