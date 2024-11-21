#!/bin/bash

if [[ $1 =~ "v" ]] # if can_int is vcan0
then
  echo "Shutdown interface $1"
  sudo ip link set vcan0 down
else
  echo "Shutdown interface $1"
  sudo ip link set can0 down
fi