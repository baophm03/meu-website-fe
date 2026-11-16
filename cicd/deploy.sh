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
# Deploy the meu-website frontend on prd149.
# Pull once, let Compose recreate only when image/config changed,
# and remove old project containers with --remove-orphans.
# ==========================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/env-param.sh"

# Allow a manual rollback/override before cicd-release.env is sourced:
#   IMAGE_REF=registry.../meu-website-fe:0.1-prod-<sha> bash cicd/deploy.sh
REQUESTED_IMAGE_REF="${IMAGE_REF:-}"

if [ -f cicd-release.env ]; then
    . ./cicd-release.env
fi

if [ -n "$REQUESTED_IMAGE_REF" ]; then
    IMAGE_REF="$REQUESTED_IMAGE_REF"
fi

export APP_IMAGE="${IMAGE_REF:-${IMAGE_NAME}:${IMAGE_TAG}}"
export PORT_APP
export CONTAINER_NAME
export COMPOSE_PROJECT_NAME

if [ -z "${REGISTRY_USER:-}" ] || [ -z "${CI_PERMISSION:-}" ]; then
    echo "ERROR: Missing CI/CD variables." >&2
    echo "Set REGISTRY_USER and CI_PERMISSION." >&2
    exit 1
fi

echo "=== Deploying ${APP_IMAGE} to ${ENVIRONMENT_NAME} on port ${PORT_APP} ==="

echo "--- Logging in to GitLab Container Registry ---"
$DOCKER_BIN logout registry.gitlab.com >/dev/null 2>&1 || true
echo "$CI_PERMISSION" | $DOCKER_BIN login registry.gitlab.com -u "$REGISTRY_USER" --password-stdin

echo "--- Capturing current running image (for reference) ---"
PREVIOUS_ID="$($DOCKER_BIN compose ps -q app 2>/dev/null | head -n1 || true)"
PREVIOUS_IMAGE=""
if [ -n "$PREVIOUS_ID" ]; then
    PREVIOUS_IMAGE="$($DOCKER_BIN inspect --format='{{.Config.Image}}' "$PREVIOUS_ID" 2>/dev/null || true)"
fi
echo "Previous image: ${PREVIOUS_IMAGE:-<none running>}"

echo "--- Pulling target image: ${APP_IMAGE} ---"
$DOCKER_BIN compose pull app

echo "--- Applying compose on port ${PORT_APP} (recreate only when image/config changed) ---"
$DOCKER_BIN compose up -d --remove-orphans app

echo "--- Waiting for container health ---"
HEALTHY=0
for i in $(seq 1 40); do
    STATUS="$($DOCKER_BIN inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$CONTAINER_NAME" 2>/dev/null || echo missing)"
    echo "health[$i]=$STATUS"
    if [ "$STATUS" = "healthy" ]; then
        HEALTHY=1
        break
    fi
    if [ "$STATUS" = "unhealthy" ] || [ "$STATUS" = "exited" ] || [ "$STATUS" = "dead" ]; then
        echo "ERROR: container is $STATUS" >&2
        $DOCKER_BIN logs --tail=120 "$CONTAINER_NAME" || true
        exit 1
    fi
    sleep 3
done

if [ "$HEALTHY" -ne 1 ]; then
    echo "ERROR: container did not become healthy within 120s" >&2
    $DOCKER_BIN compose ps app || true
    $DOCKER_BIN logs --tail=120 "$CONTAINER_NAME" || true
    exit 1
fi

echo "--- Container status ---"
$DOCKER_BIN compose ps app

echo "--- Cleaning dangling images (old container was already removed by Compose) ---"
$DOCKER_BIN image prune -f || true

echo "=== Deployment successful ==="
echo "Image: ${APP_IMAGE}"
echo "URL:   http://127.0.0.1:${PORT_APP}/"
