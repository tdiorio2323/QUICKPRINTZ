#!/usr/bin/env bash
set -euo pipefail
: "${GITHUB_USER:=tdiorio2323}"
: "${VERCEL_TOKEN:?set VERCEL_TOKEN}"

# Optional: export VERCEL_SCOPE to a team slug. Leave unset for personal.
SCOPE_ARGS=()
if [[ "${VERCEL_SCOPE:-}" != "" && "${VERCEL_SCOPE:-}" != "personal" ]]; then
  SCOPE_ARGS+=(--scope "${VERCEL_SCOPE}")
fi

OUT="audit-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUT/github" "$OUT/vercel"

# ---- identities
gh auth status -h github.com >/dev/null 2>&1 || { echo "Run: gh auth login"; exit 1; }
gh api user --jq '.login' > "$OUT/github/whoami.txt" || true
vercel whoami --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" > "$OUT/vercel/whoami.txt" || true

# ---- GitHub
gh repo list "$GITHUB_USER" -L 1000 \
  --json nameWithOwner,visibility,isPrivate,isArchived,defaultBranchRef,pushedAt,updatedAt,sshUrl,homepageUrl \
  > "$OUT/github/repos.json"

jq -r '.[].nameWithOwner' "$OUT/github/repos.json" | while read -r REPO; do
  SAFE="${REPO//\//__}"; DIR="$OUT/github/repos/$SAFE"; mkdir -p "$DIR"
  gh api -H "accept: application/vnd.github+json" "/repos/$REPO/collaborators?per_page=100" > "$DIR/collaborators.json" || true
  gh repo deploy-key list -R "$REPO" --json id,title,createdAt,readOnly > "$DIR/deploy_keys.json" || true
  gh api "/repos/$REPO/hooks?per_page=100" > "$DIR/webhooks.json" || true
  gh secret list   -R "$REPO" --json name,createdAt,updatedAt,visibility > "$DIR/secrets.json"   || true
  gh variable list -R "$REPO" --json name,createdAt,updatedAt,visibility > "$DIR/variables.json" || true
  DEF=$(jq -r --arg R "$REPO" 'map(select(.nameWithOwner==$R))[0].defaultBranchRef.name // empty' "$OUT/github/repos.json")
  if [[ -n "$DEF" ]]; then gh api "/repos/$REPO/branches/$DEF/protection" > "$DIR/branch_protection.json" || true; fi
  gh ruleset list --repo "$REPO" --format json > "$DIR/rulesets.json" || true
  gh api "/repos/$REPO/dependabot/alerts?per_page=100"    > "$DIR/dependabot_alerts.json"    || true
  gh api "/repos/$REPO/code-scanning/alerts?per_page=100" > "$DIR/code_scanning_alerts.json" || true
done

jq -r '.[] | [ .nameWithOwner, .visibility, .isPrivate, .isArchived, (.defaultBranchRef.name // ""), .pushedAt, .updatedAt ] | @csv' \
  "$OUT/github/repos.json" > "$OUT/github/repos_summary.csv"

# ---- Vercel
mkdir -p "$OUT/vercel/projects"
vercel project ls --json --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" > "$OUT/vercel/projects/projects.json" || true
jq -r '.[].name' "$OUT/vercel/projects/projects.json" 2>/dev/null | while read -r P; do
  PDIR="$OUT/vercel/projects/$P"; mkdir -p "$PDIR"
  vercel env ls "$P" --json --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" > "$PDIR/envs.json"       ||
  vercel list   "$P" --json --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" > "$PDIR/deployments.json" ||
  vercel domains ls "$P" --json --token "$VERCEL_TOKEN" "${SCOPE_ARGS[@]}" > "$PDIR/domains.json" || true
done

# user events
curl -fsSL -H "Authorization: Bearer $VERCEL_TOKEN" "https://api.vercel.com/v1/user/events?limit=100" \
  > "$OUT/vercel/user_events.json" || true

zip -r "${OUT}.zip" "$OUT" >/dev/null || true
echo "Archive: ${OUT}.zip"
column -s, -t < "$OUT/github/repos_summary.csv" | head -n 20 || true
jq -r '.[].name' "$OUT/vercel/projects.json" 2>/dev/null | nl -ba || true
