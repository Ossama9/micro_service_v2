# !bin/sh

buf generate
buf export . --output ../user-api/src/proto
buf export . --output ../hotel-api/src/proto
