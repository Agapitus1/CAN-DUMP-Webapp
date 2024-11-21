#!/bin/bash

# setup the interface for can and vcan
# can0/vcan0

sudo modprobe can
sudo modprobe vcan

if [[ $1 =~ "v" ]] # if can_int is vcan0
then
  echo "Setting up vcan"
  sudo ip link add dev $1 type vcan
  sudo ip link set up $1
else
  echo "Setting up can"
  sudo ip link set $1 up type can bitrate $2
  sudo ip link set up $1
fi
