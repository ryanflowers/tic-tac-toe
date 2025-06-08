#!/bin/bash
set -e

# Remove existing dist directory
rm -rf dist

# Create dist directory structure
mkdir -p dist/generated

# Copy Prisma generated files
cp -r src/generated/client dist/generated/

# Copy and compile TypeScript files
tsc