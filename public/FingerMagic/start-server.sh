#!/bin/bash
# Simple script to start a local server for the FingerMagic project
echo "Starting FingerMagic server at http://localhost:8090"
http-server -p 8090 .
