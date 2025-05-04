#!/bin/bash

protoc --plugin=.\\node_modules\\.bin\\protoc-gen-ts_proto --ts_proto_opt=onlyTypes=true --ts_proto_out=dist src/*.proto -I src