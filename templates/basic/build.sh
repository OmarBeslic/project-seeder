#!/usr/bin/env bash
version=$1

repo="PLACEHOLDER_PROJECT_FOLDER"
target_platforms="linux/amd64"

# exit when any command fails
set -e

echoc() { # set different color for this script
  echo -e "\x1B[1m\x1B[35m$1\x1B[0m\x1B[39m"
}

if [[ -z "${version:-}" ]]; then
   echoc "Please provide a version! Last version is:"
   cat "latest-version"
   echoc "To upgrade the service provide \`--deploy\` argument (optional)."
   exit 1
fi

echoc "📦 Building PLACEHOLDER_PROJECT_FOLDER $version"
echo "$version" > "latest-version"

docker buildx build \
  --ssh default \
  --platform=$target_platforms \
  --cache-to type=inline \
  --tag "$repo:$version" \
  --push \
  .

echoc "📤 Pushed image $repo:$version"

echoc "🔥 Done!"
tput bel
