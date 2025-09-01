#!/usr/bin/env bash
set -euo pipefail
OUT="${1:-audit-$(date +%Y%m%d-%H%M%S)}"
mkdir -p "$OUT/github" "$OUT/vercel"

# GitHub
gh auth status >/dev/null 2>&1 || gh auth login --with-token <<<"$GITHUB_TOKEN"
gh repo list "$GITHUB_USER" -L 1000 \
  --json nameWithOwner,visibility,isPrivate,archived,defaultBranchRef,pushedAt,updatedAt,sshUrl,homepageUrl \
  > "$OUT/github/repos.json"
jq -r '.[].nameWithOwner' "$OUT/github/repos.json" | while read -r REPO; do
  SAFE="${REPO//\//__}"; DIR="$OUT/github/repos/$SAFE"; mkdir -p "$DIR"
  gh api -H "accept: application/vnd.github+json" "/repos/$REPO/collaborators?per_page=100" > "$DIR/collaborators.json" || true
  gh repo deploy-key list -R "$REPO" --json id,title,createdAt,readOnly > "$DIR/deploy_keys.json" || true
  gh api "/repos/$REPO/hooks?per_page=100" > "$DIR/webhooks.json" || true
  gh secret list   -R "$REPO" --json name,createdAt,updatedAt,visibility > "$DIR/secrets.json"   || true
  gh variable list -R "$REPO" --json name,createdAt,updatedAt,visibility > "$DIR/variables.json" || true
  DEF=$(jq -r --arg R "$REPO" 'map(select(.nameWithOwner==$R))[0].defaultBranchRef.name' "$OUT/github/repos.json")
  if [[ "$DEF" != "null" && -n "$DEF" ]]; then
    gh api "/repos/$REPO/branches/$DEF/protection" > "$DIR/branch_protection.json" || true
  fi
  gh ruleset list --repo "$REPO" --format json > "$DIR/rulesets.json" || true
  gh api "/repos/$REPO/dependabot/alerts?per_page=100"    > "$DIR/dependabot_alerts.json"    || true
  gh api "/repos/$REPO/code-scanning/alerts?per_page=100" > "$DIR/code_scanning_alerts.json" || true
done
gh ssh-key list --json id,title,key,createdAt > "$OUT/github/account_ssh_keys.json" || true
jq -r '.[] | [.nameWithOwner,.visibility,.archived,.defaultBranchRef.name,.pushedAt,.updatedAt] | @csv' \
  "$OUT/github/repos.json" > "$OUT/github/repos_summary.csv"

# Vercel
mkdir -p "$OUT/vercel/projects"
vercel whoami --token "$VERCEL_TOKEN" --scope "$VERCEL_SCOPE" > "$OUT/vercel/whoami.txt" || true
vercel project ls --json --token "$VERCEL_TOKEN" --scope "$VERCEL_SCOPE" > "$OUT/vercel/projects/projects.json" || true
jq -r '.[].name' "$OUT/vercel/projects/projects.json" 2>/dev/null | while read -r P; do
  PDIR="$OUT/vercel/projects/$P"; mkdir -p "$PDIR"
  vercel env ls     "$P" --json --token "$VERCEL_TOKEN" --scope "$VERCEL_SCOPE" > "$PDIR/envs.json"        || true
  vercel list       "$P" --json --token "$VERCEL_TOKEN" --scope "$VERCEL_SCOPE" > "$PDIR/deployments.json"  || true
  vercel domains ls "$P" --json --token "$VERCEL_TOKEN" --scope "$VERCEL_SCOPE" > "$PDIR/domains.json"      || true
done
curl -fsSL -H "Authorization: Bearer $VERCEL_TOKEN" "https://api.vercel.com/v1/user/events?limit=100" \
  > "$OUT/vercel/user_events.json" || true
echo "wrote $OUT"
