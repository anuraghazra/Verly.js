# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4] - 05-07-2019
### Fixed
- independent internal rendering engine
- multiple instance of verly.js was causing global var collisions (WIDTH, HEIGHT, CTX)
### Changed
- Entity.js Class now expects two arguments (iteration, verlyInstance) because previously we used global variables to keep track of WIDTH, HEIGHT and ctx which was casing some problems
- When extending Entity class we have to do super(iteration, verlyInstance)
- Point.js Class's render, constrain, update methods now expects verlyInstance and ctx variables to be passed.