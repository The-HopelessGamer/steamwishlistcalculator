#!/bin/bash

protoc --plugin=.\\node_modules\\.bin\\protoc-gen-ts_proto --ts_proto_out=dist --ts_proto_opt=forceLong=string src/*.proto -I src

tsc