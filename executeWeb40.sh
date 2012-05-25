#!/bin/bash
nodejs hookio/monkey/monkey.js > monkey.log &
hookio/hooks/runAllHooks.sh > hooks.log &
wait
