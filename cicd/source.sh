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
# Build metadata for the meu-website frontend pipeline.
# ==========================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/env-param.sh"

echo "=== Generating release metadata ==="
APP_VERSION="${CI_COMMIT_SHORT_SHA:-$(git rev-parse --short HEAD)}"
IMAGE_TAG="${IMAGE_TAG:-0.1-prod}"
IMAGE_REF="${IMAGE_NAME}:${IMAGE_TAG}"
IMAGE_REF_SHA="${IMAGE_NAME}:${IMAGE_TAG}-${APP_VERSION}"
BUILD_TIME="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
GIT_COMMIT_SHA="${CI_COMMIT_SHA:-$(git rev-parse HEAD)}"

cat > cicd-release.env <<EOF
APP_VERSION=${APP_VERSION}
IMAGE_TAG=${IMAGE_TAG}
IMAGE_REF=${IMAGE_REF}
IMAGE_REF_SHA=${IMAGE_REF_SHA}
BUILD_TIME=${BUILD_TIME}
GIT_COMMIT_SHA=${GIT_COMMIT_SHA}
EOF

echo "Release metadata:"
cat cicd-release.env
