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
# Build and push the meu-website frontend image.
# ==========================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/env-param.sh"

if [ -f cicd-release.env ]; then
    . ./cicd-release.env
fi

IMAGE_REF="${IMAGE_REF:-${IMAGE_NAME}:${IMAGE_TAG}}"
APP_VERSION="${APP_VERSION:-local}"
IMAGE_REF_SHA="${IMAGE_REF_SHA:-${IMAGE_NAME}:${IMAGE_TAG}-${APP_VERSION}}"
BUILD_TIME="${BUILD_TIME:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}"
CI_COMMIT_SHA="${CI_COMMIT_SHA:-unknown}"
CI_PROJECT_URL="${CI_PROJECT_URL:-unknown}"

if [ -z "${REGISTRY_USER:-}" ] || [ -z "${CI_PERMISSION:-}" ]; then
    echo "ERROR: Missing CI/CD variables." >&2
    echo "Set REGISTRY_USER and CI_PERMISSION." >&2
    exit 1
fi

echo "=== Logging in to GitLab Container Registry ==="
$DOCKER_BIN logout registry.gitlab.com >/dev/null 2>&1 || true
echo "$CI_PERMISSION" | $DOCKER_BIN login registry.gitlab.com -u "$REGISTRY_USER" --password-stdin

echo "=== Building Docker image: ${IMAGE_REF} ==="
echo "NEXT_PUBLIC_BACKEND_HOST=${NEXT_PUBLIC_BACKEND_HOST}"
echo "NEXT_PUBLIC_FRONTEND_HOST=${NEXT_PUBLIC_FRONTEND_HOST}"
$DOCKER_BIN build \
    --pull \
    --label "org.opencontainers.image.revision=${CI_COMMIT_SHA}" \
    --label "org.opencontainers.image.created=${BUILD_TIME}" \
    --label "org.opencontainers.image.source=${CI_PROJECT_URL}" \
    --build-arg "NEXT_PUBLIC_BACKEND_HOST=${NEXT_PUBLIC_BACKEND_HOST}" \
    --build-arg "NEXT_PUBLIC_FRONTEND_HOST=${NEXT_PUBLIC_FRONTEND_HOST}" \
    -t "${IMAGE_REF}" \
    -t "${IMAGE_REF_SHA}" \
    .

echo "=== Pushing image: ${IMAGE_REF} ==="
$DOCKER_BIN push "${IMAGE_REF}"

echo "=== Pushing image: ${IMAGE_REF_SHA} ==="
$DOCKER_BIN push "${IMAGE_REF_SHA}"

echo "Docker images pushed successfully."
