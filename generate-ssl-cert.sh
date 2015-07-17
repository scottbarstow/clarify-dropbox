#!/bin/bash
echo "Generating self-signed certificates..."
openssl genrsa -out ./config/ssl/key.pem -aes256 1024
openssl req -new -key ./config/ssl/key.pem -out ./config/ssl/csr.pem
openssl x509 -req -days 9999 -in ./config/ssl/csr.pem -signkey ./config/ssl/key.pem -out ./config/ssl/cert.pem
rm ./config/ssl/csr.pem
openssl rsa -in ./config/ssl/key.pem -out ./config/ssl/key.pem
chmod 600 ./config/ssl/key.pem ./config/ssl/cert.pem