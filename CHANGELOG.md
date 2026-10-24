# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [1.0.0-rc.2] - 2026-10-24

Pre-release.

### Changed

- The unit list now comes from the developer's elevation chart (297 units in Blocks 78, 80,
  82, 86 and 88) and is marked as verified.
- Block 84 is removed because it is not a residential block.

## [1.0.0-rc.1] - 2026-10-24

Pre-release for trial use at the gates. The unit list is still unverified.

### Added

- Unit checker that answers valid or invalid for a level and unit, with an optional block.
- Block chips for 78–88. "Any" searches every block, and the app shows when a unit exists
  in a different block from the one named.
- Unit layout data for 78–88 Tanah Merah Kechil Avenue, marked as unverified.
- Light, dark and system themes.
- Installable PWA with offline support.
- Docker image (nginx) and docker-compose file.
- GitHub Actions workflows for CI and GitHub Pages deployment.
