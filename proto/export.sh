# !bin/sh

buf generate
buf export . --output ../user-api/src/proto
buf export . --output ../auth-api/src/proto
buf export . --output ../hotel-api/src/proto
buf export . --output ../announce-api/src/proto
