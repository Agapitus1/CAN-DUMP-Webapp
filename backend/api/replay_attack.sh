#!/bin/bash

#replay the message with the specified time interval
end=$((SECONDS+10))

while [ $SECONDS -lt $end ]; do cansend $1 $2; sleep $3; done