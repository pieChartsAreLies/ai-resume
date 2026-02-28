#!/bin/bash
# deploy/deploy.sh
# Run from the ai-resume project root on development machine.
# Deploys to CT 202 via Freya (Proxmox host).
set -e

PROXMOX_HOST="root@192.168.2.13"
CT=202

echo "=== Building frontend ==="
cd "Portfolio Site" && npm run build && cd ..

echo "=== Packaging backend ==="
tar czf /tmp/ai-resume-backend.tar.gz --exclude='__pycache__' --exclude='.pytest_cache' --exclude='data' backend/

echo "=== Packaging frontend ==="
tar czf /tmp/ai-resume-frontend.tar.gz -C "Portfolio Site/dist" .

echo "=== Uploading to CT $CT ==="
scp /tmp/ai-resume-backend.tar.gz /tmp/ai-resume-frontend.tar.gz "$PROXMOX_HOST:/tmp/"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/ai-resume-backend.tar.gz /tmp/ai-resume-backend.tar.gz"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/ai-resume-frontend.tar.gz /tmp/ai-resume-frontend.tar.gz"

echo "=== Deploying backend ==="
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'mkdir -p /opt/ai-resume && cd /opt/ai-resume && tar xzf /tmp/ai-resume-backend.tar.gz'"
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'cd /opt/ai-resume && python3 -m venv venv && source venv/bin/activate && pip install -r backend/requirements.txt'"

echo "=== Deploying frontend ==="
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'mkdir -p /var/www/ai-resume && cd /var/www/ai-resume && rm -rf * && tar xzf /tmp/ai-resume-frontend.tar.gz'"

echo "=== Installing services ==="
scp deploy/ai-resume-api.service "$PROXMOX_HOST:/tmp/"
scp deploy/nginx-ai-resume.conf "$PROXMOX_HOST:/tmp/"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/ai-resume-api.service /etc/systemd/system/ai-resume-api.service"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/nginx-ai-resume.conf /etc/nginx/sites-available/ai-resume"

echo "=== Starting services ==="
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'ln -sf /etc/nginx/sites-available/ai-resume /etc/nginx/sites-enabled/ai-resume && systemctl daemon-reload && systemctl enable ai-resume-api && systemctl restart ai-resume-api && systemctl restart nginx'"

echo "=== Done! Test at http://192.168.2.68 ==="
