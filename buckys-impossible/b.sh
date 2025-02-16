#!/bin/bash

# Loop from 0 to 26 inclusive
for x in {0..26}; do
  echo "Processing version $x..."
  echo "fs.write(\"$x.rbxlx\", fs.read(\"$x.rbxl\"))" | rbxmk run -
done

