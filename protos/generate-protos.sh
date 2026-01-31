#!/bin/bash

protoc --plugin=.\\node_modules\\.bin\\protoc-gen-ts_proto --ts_proto_out=dist --ts_proto_opt=forceLong=string --ts_proto_opt=globalThisPolyfill=true src/*.proto -I src

tsc