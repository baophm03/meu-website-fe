#!/usr/bin/env bash
# ==========================================
# Author:         Quach Dac Duc Manh
# Email:          quachdacducmanhk16@siu.edu.vn
# Phone:          +84 396 677 325
# -----------------------------------
# Created:        2026-11-16
# LastEditTime:   2026-11-16
# Version:        1.0
# Status:         Updated
# ==========================================
#
# Deployment parameters for meu-website frontend.
# Pattern adapted from Week_11/accountant-frontend.
# ==========================================

export PROJECT_NAME="${PROJECT_NAME:-meu-website-fe}"
export ENVIRONMENT_NAME="${ENVIRONMENT_NAME:-production}"

export IMAGE_NAME="${IMAGE_NAME:-registry.gitlab.com/meu-solutions/meu-website/fe}"
export IMAGE_TAG="${IMAGE_TAG:-0.1-prod}"
export APP_IMAGE="${APP_IMAGE:-${IMAGE_NAME}:${IMAGE_TAG}}"

# Fixed host port on prd149. No getport call on every deploy.
export PORT_APP="${PORT_APP:-8136}"

export CONTAINER_NAME="${CONTAINER_NAME:-production-meu-website-fe}"
export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-meu-website-fe}"

# Shell runner on prd149 uses sudo docker.
# Override with DOCKER_BIN=docker if the runner user has direct Docker access.
export DOCKER_BIN="${DOCKER_BIN:-sudo docker}"

# Next.js build-time public env. Override with GitLab CI variables if needed.
export NEXT_PUBLIC_BACKEND_HOST="${NEXT_PUBLIC_BACKEND_HOST:-https://meu-solutions.com}"
export NEXT_PUBLIC_FRONTEND_HOST="${NEXT_PUBLIC_FRONTEND_HOST:-https://meu-solutions.com}"
