#!/bin/bash
cd ./client && yarn dev | 
sed -e 's/^/[client] /' &
stripe listen --forward-to localhost:3000/api/stripe/webhooks && 
kill $!