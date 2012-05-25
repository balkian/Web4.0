#!/bin/bash
for i in $(ls `npm bin`/hookio-* 2> /dev/null)
do
    echo running $i
	nodejs $i &
done
for i in `ls | grep "hook.io-" 2>/dev/null`
do
    echo running $i
    nodejs $i/index.js &
done
wait
