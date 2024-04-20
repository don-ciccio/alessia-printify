#!/bin/bash
cd ./server && yarn dev | 
sed -e 's/^/[server] /' & 
cd ./client && yarn dev | 
sed -e 's/^/[client] /' && 
kill $!