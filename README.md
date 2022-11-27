# Sonarr "intelligent" manual import

I built this to import media that isn't organised in TVDB's aired order format. This tool ignores seasons and directly maps episodes on disk to corresponding episode IDs in Sonarr. Files on disk are matched to Sonarr's episodes based on similarity, so differences between saved media and TVDB's naming aren't a concern.

If you want to use the tool, you WILL have to change the episode name matching regex to whatever your files use - Copilot makes this easy 😉

# Usage

```bash
# Build
git clone https://github.com/RihanArfan/sonarr-intelligent-manual-import.git
cd sonarr-intelligent-manual-import/
docker build . --tag=sonarr-manual-import

# Configure
cp .env.example .env

# Run
docker run --env-file .env --rm sonarr-manual-import
```

## Technologies

- Top-level await
- SWC - Rust TypeScript compiler
- TypeScript
